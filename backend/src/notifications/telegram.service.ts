import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID;
  private readonly apiUrl = `https://api.telegram.org/bot${this.botToken}`;

  async sendContactNotification(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<boolean> {
    // Check if credentials are set
    if (!this.botToken || !this.chatId) {
      this.logger.warn('Telegram credentials not configured');
      return false;
    }

    try {
      const telegramMessage = this.formatMessage(data);

      await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: this.chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      });

      this.logger.log(`Telegram notification sent for contact from ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send Telegram notification: ${error.message}`);
      return false;
    }
  }

  private formatMessage(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): string {
    const timestamp = new Date().toLocaleString();

    return `
<b>🎯 New Contact Form Submission</b>

<b>Name:</b> ${this.escapeHtml(data.name)}
<b>Email:</b> ${this.escapeHtml(data.email)}
${data.subject ? `<b>Subject:</b> ${this.escapeHtml(data.subject)}\n` : ''}
<b>Message:</b>
${this.escapeHtml(data.message)}

<i>Received at: ${timestamp}</i>
    `.trim();
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
