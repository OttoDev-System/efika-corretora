import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { AuthStore, User, LoginForm, Profile } from '@/types/auth';

// Test users for development/testing
const TEST_USERS: Record<string, User> = {
  'admin@efika.com.br': {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'admin@efika.com.br',
    name: 'Administrador Sistema',
    role: 'admin',
    permissions: ['*'],
    firstLogin: false
  },
  'corretor@efika.com.br': {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'corretor@efika.com.br',
    name: 'Corretor de Seguros',
    role: 'corretor',
    permissions: ['leads:read', 'leads:write', 'clients:read', 'clients:write'],
    firstLogin: false
  },
  'suporte@efika.com.br': {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'suporte@efika.com.br',
    name: 'Suporte Técnico',
    role: 'suporte',
    permissions: ['tickets:read', 'tickets:write', 'clients:read'],
    firstLogin: false
  }
};

// Test passwords
const TEST_PASSWORDS: Record<string, string> = {
  'admin@efika.com.br': '123456',
  'corretor@efika.com.br': '123456',
  'suporte@efika.com.br': '123456'
};

const mapProfileToUser = (profile: Profile): User => ({
  id: profile.user_id,
  email: profile.email,
  name: profile.name,
  role: profile.role,
  avatar: profile.avatar,
  permissions: profile.permissions,
  firstLogin: profile.first_login,
  lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginForm) => {
        console.log("🔐 AuthStore login chamado com:", credentials);
        set({ isLoading: true, error: null });
        
        try {
          // Check if it's a test user first
          console.log("🔍 Verificando usuários de teste disponíveis:", Object.keys(TEST_USERS));
          const testUser = TEST_USERS[credentials.email];
          console.log("👤 Usuário de teste encontrado:", testUser);
          console.log("🔑 Senha fornecida:", credentials.password);
          console.log("🔑 Senha esperada:", TEST_PASSWORDS[credentials.email]);
          
          if (testUser && TEST_PASSWORDS[credentials.email] === credentials.password) {
            console.log("✅ Login de usuário de teste bem-sucedido");
            // Test user login
            set({ 
              user: testUser, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
            return;
          } else {
            console.log("❌ Credenciais de teste não conferem");
          }

          // Regular Supabase authentication
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            throw new Error(error.message);
          }

          if (data.user) {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', data.user.id)
              .single();

            if (profileError) {
              throw new Error('Erro ao buscar perfil do usuário');
            }

            // Update last login
            await supabase
              .from('profiles')
              .update({ 
                last_login: new Date().toISOString(),
                first_login: false 
              })
              .eq('user_id', data.user.id);

            const user = mapProfileToUser(profile);
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao fazer login',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      checkSession: async () => {
        set({ isLoading: true });
        
        try {
          // Check for existing test user in localStorage first
          const persistedState = localStorage.getItem('efika-auth-storage');
          if (persistedState) {
            const parsed = JSON.parse(persistedState);
            if (parsed?.state?.user && parsed?.state?.isAuthenticated) {
              const testUser = TEST_USERS[parsed.state.user.email];
              if (testUser) {
                set({ 
                  user: testUser, 
                  isAuthenticated: true, 
                  isLoading: false 
                });
                return;
              }
            }
          }

          // Regular Supabase session check
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();

            if (!error && profile) {
              const user = mapProfileToUser(profile);
              set({ 
                user, 
                isAuthenticated: true, 
                isLoading: false 
              });
              return;
            }
          }
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'efika-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Setup auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  const { checkSession } = useAuthStore.getState();
  
  if (event === 'SIGNED_OUT' || !session) {
    useAuthStore.setState({ 
      user: null, 
      isAuthenticated: false 
    });
  } else if (event === 'SIGNED_IN' && session) {
    await checkSession();
  }
});