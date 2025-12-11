/**
 * API Route per inviare email tramite Resend
 * Fyndiax Contact Form
 */

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  fullName: string;
  organisation: string;
  role: string;
  email: string;
  message?: string;
  iAm: string[];
  interests: string[];
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { fullName, organisation, role, email, message, iAm, interests } = body;

    // Validazione campi obbligatori
    if (!fullName || !email || !organisation || !role) {
      return NextResponse.json(
        { error: 'Full name, email, organisation and role are required' },
        { status: 400 }
      );
    }

    // Configurazione email da variabili d'ambiente
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'hello@liftyup.com';
    const toEmail = process.env.RESEND_TO_EMAIL || 'info@fyndiax.com';

    // Formatta le chips come lista HTML
    const formatChips = (items: string[]) => {
      if (!items || items.length === 0) return '<span style="color: #64748B;">Not specified</span>';
      return items.map(item => `
        <span style="
          display: inline-block;
          padding: 6px 14px;
          margin: 4px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 20px;
          font-size: 13px;
          color: #E2E8F0;
        ">${item}</span>
      `).join('');
    };

    // Template email HTML con design Fyndiax
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact from Fyndiax</title>
        </head>
        <body style="
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #050508;
          color: #E2E8F0;
          line-height: 1.6;
        ">
          <div style="
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          ">
            <!-- Header with Gradient -->
            <div style="
              background: linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%);
              padding: 40px 30px;
              border-radius: 16px 16px 0 0;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                color: white;
                letter-spacing: -0.02em;
              ">⚡ Fyndiax</h1>
              <p style="
                margin: 12px 0 0 0;
                font-size: 15px;
                color: rgba(255, 255, 255, 0.9);
              ">New contact form submission</p>
            </div>
            
            <!-- Main Content -->
            <div style="
              background: linear-gradient(180deg, #0C0C12 0%, #12121A 100%);
              padding: 30px;
              border-left: 1px solid rgba(139, 92, 246, 0.3);
              border-right: 1px solid rgba(139, 92, 246, 0.3);
            ">
              <!-- Contact Info Card -->
              <div style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 20px;
              ">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #8B5CF6; font-weight: 600; width: 120px; vertical-align: top;">👤 Name</td>
                    <td style="padding: 8px 0; color: #FFFFFF;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8B5CF6; font-weight: 600; vertical-align: top;">🏢 Organisation</td>
                    <td style="padding: 8px 0; color: #FFFFFF;">${organisation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8B5CF6; font-weight: 600; vertical-align: top;">💼 Role</td>
                    <td style="padding: 8px 0; color: #FFFFFF;">${role}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8B5CF6; font-weight: 600; vertical-align: top;">📧 Email</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${email}" style="color: #00D4FF; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #8B5CF6; font-weight: 600; vertical-align: top;">📅 Date</td>
                    <td style="padding: 8px 0; color: #94A3B8;">${new Date().toLocaleString('en-GB', { 
                      dateStyle: 'full', 
                      timeStyle: 'short' 
                    })}</td>
                  </tr>
                </table>
              </div>

              <!-- I Am Section -->
              <div style="
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
              ">
                <p style="
                  margin: 0 0 12px 0;
                  color: #8B5CF6;
                  font-weight: 600;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                ">🎯 I am</p>
                <div>${formatChips(iAm)}</div>
              </div>

              <!-- Interests Section -->
              <div style="
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
              ">
                <p style="
                  margin: 0 0 12px 0;
                  color: #00D4FF;
                  font-weight: 600;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                ">💡 Interested in</p>
                <div>${formatChips(interests)}</div>
              </div>

              <!-- Message Section -->
              ${message ? `
                <div style="
                  background: rgba(255, 255, 255, 0.03);
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  border-radius: 12px;
                  padding: 20px;
                ">
                  <p style="
                    margin: 0 0 12px 0;
                    color: #14F195;
                    font-weight: 600;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                  ">💬 Message</p>
                  <p style="
                    margin: 0;
                    color: #E2E8F0;
                    white-space: pre-wrap;
                    line-height: 1.7;
                  ">${message.replace(/\n/g, '<br>')}</p>
                </div>
              ` : ''}
            </div>
            
            <!-- Footer -->
            <div style="
              background: #0C0C12;
              padding: 24px;
              border-radius: 0 0 16px 16px;
              border: 1px solid rgba(139, 92, 246, 0.2);
              border-top: none;
              text-align: center;
            ">
              <p style="
                margin: 0;
                color: #64748B;
                font-size: 13px;
              ">This message was sent from the contact form at <strong style="color: #8B5CF6;">fyndiax.com</strong></p>
              <p style="
                margin: 8px 0 0 0;
                font-size: 12px;
                color: #475569;
              ">Science-backed ventures for real-world impact 🚀</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Invia email con Resend
    const { data, error } = await resend.emails.send({
      from: `Fyndiax Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `⚡ New inquiry from ${fullName} - ${organisation}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully!', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

