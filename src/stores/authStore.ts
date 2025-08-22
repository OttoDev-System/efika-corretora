import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { AuthStore, User, LoginForm, Profile } from '@/types/auth';

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
        set({ isLoading: true, error: null });
        
        try {
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