import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InviteEmailRequest {
  email: string;
  name: string;
  role: string;
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, role, token }: InviteEmailRequest = await req.json();

    const inviteUrl = `${Deno.env.get("SUPABASE_URL")}/auth/first-access?token=${token}`;
    
    const roleMap = {
      'corretor': 'Corretor',
      'suporte': 'Suporte',
      'admin': 'Administrador'
    };

    const emailResponse = await resend.emails.send({
      from: "Efika Corretora <noreply@efikacorretora.com.br>",
      to: [email],
      subject: `Bem-vindo(a) à Efika Corretora - ${roleMap[role as keyof typeof roleMap]}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #1E2B73; color: white; padding: 15px; border-radius: 10px; display: inline-block;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">EFIKA</h1>
            </div>
          </div>
          
          <h2 style="color: #1E2B73; text-align: center;">Bem-vindo(a) à Efika Corretora!</h2>
          
          <p style="color: #333; font-size: 16px;">Olá <strong>${name}</strong>,</p>
          
          <p style="color: #333; font-size: 16px;">
            Você foi convidado(a) para fazer parte da equipe da Efika Corretora como <strong>${roleMap[role as keyof typeof roleMap]}</strong>.
          </p>
          
          <p style="color: #333; font-size: 16px;">
            Para começar a usar o sistema, você precisa definir sua senha de acesso clicando no botão abaixo:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteUrl}" 
               style="background: #1E2B73; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Definir Minha Senha
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Se o botão não funcionar, copie e cole este link no seu navegador:<br>
            <a href="${inviteUrl}" style="color: #1E2B73;">${inviteUrl}</a>
          </p>
          
          <p style="color: #666; font-size: 14px;">
            Este convite é válido por 24 horas. Se você não solicitou este convite, pode ignorar este email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 Efika Corretora - Seguros e Planos de Saúde
          </p>
        </div>
      `,
    });

    console.log("Invite email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, messageId: emailResponse.data?.id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending invite email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);