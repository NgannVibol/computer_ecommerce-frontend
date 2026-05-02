const TELEGRAM_BOT_TOKEN = '8277738788:AAHFF0leA_X0KtbclupZOTpphywGso0EwGU';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const ADMIN_CHAT_ID = '5443355814';

class TelegramService {
  async sendOrderNotification(orderData) {
    try {
      const message = this.formatOrderMessage(orderData);
      await this.sendMessage(ADMIN_CHAT_ID, message);
      
      if (orderData.customer?.phone) {
        await this.sendContact(ADMIN_CHAT_ID, orderData.customer.phone, orderData.customer.fullName);
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Telegram Error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendMessage(chatId, text) {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: String(chatId),
        text: text,
        parse_mode: 'HTML'
      })
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.description);
    return data;
  }

  async sendContact(chatId, phoneNumber, fullName) {
    const nameParts = fullName.split(' ');
    const response = await fetch(`${TELEGRAM_API_URL}/sendContact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: String(chatId),
        phone_number: phoneNumber.replace(/\s/g, ''),
        first_name: nameParts[0] || 'Customer',
        last_name: nameParts.slice(1).join(' ') || ''
      })
    });
    return response.json();
  }

  formatOrderMessage(order) {
    const { orderNumber, customer, items, total, paymentMethod, address, orderDate } = order;
    
    const itemsList = items.map((item, i) => 
      `${i + 1}. <b>${this.escapeHtml(item.name)}</b>\n   └ ${item.quantity} x $${item.price} = <b>$${(item.price * item.quantity).toFixed(2)}</b>`
    ).join('\n\n');

    const fullAddress = [
      address.houseNo && `#${address.houseNo}`,
      address.street,
      address.village,
      address.commune,
      address.district,
      address.province
    ].filter(Boolean).join(', ');

    return `<b>🛍️ NEW ORDER #NK-${orderNumber}</b>

━━━━━━━━━━━━━━━━━━━━━
<b>👤 CUSTOMER</b>
━━━━━━━━━━━━━━━━━━━━━
Name: ${this.escapeHtml(customer.fullName)}
Phone: <code>${this.escapeHtml(customer.phone)}</code>
Email: ${this.escapeHtml(customer.email || 'N/A')}

━━━━━━━━━━━━━━━━━━━━━
<b>📍 DELIVERY</b>
━━━━━━━━━━━━━━━━━━━━━
${this.escapeHtml(fullAddress)}
Type: ${address.addressType === 'home' ? '🏠 Home' : '🏢 Work'}
${address.notes ? `\n📝 Notes: ${this.escapeHtml(address.notes)}` : ''}

━━━━━━━━━━━━━━━━━━━━━
<b>📦 ITEMS (${items.length})</b>
━━━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━━━
<b>💰 PAYMENT</b>
━━━━━━━━━━━━━━━━━━━━━
Method: ${this.escapeHtml(paymentMethod)}
Total: <b>$${total.toFixed(2)}</b>
━━━━━━━━━━━━━━━━━━━━━

🕐 ${new Date(orderDate).toLocaleString('en-US', { 
  timeZone: 'Asia/Phnom_Penh',
  dateStyle: 'full',
  timeStyle: 'medium'
})}`;
  }

  escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

const telegramService = new TelegramService();
export default telegramService;