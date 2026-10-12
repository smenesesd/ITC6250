
import { supabase } from './services/supabaseClient.js';

async function testSupabaseConnection() {
    const { data, error } = await supabase
        .from('events')
        .select('id, title')
        .limit(5);

    const status = document.createElement('pre');

    status.style.cssText = `
        margin: 20px;
        padding: 16px;
        background: #f1f5f9;
        color: #111827;
        border-radius: 8px;
        white-space: pre-wrap;
    `;

    if (error) {
        console.error('Supabase connection failed:', error);
        status.textContent =
            `Connection failed: ${error.message}`;
    } else {
        console.log('Supabase connection successful:', data);

        status.textContent =
            `Connection successful!\n` +
            `Events retrieved: ${data.length}\n\n` +
            data.map(event => event.title).join('\n');
    }

    document.body.appendChild(status);
}

testSupabaseConnection();
