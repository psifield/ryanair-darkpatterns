import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export const NewsletterFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <aside className="bg-gray-100 border-t border-gray-200 mt-12 py-8 px-4" data-purpose="newsletter-subscribe">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#073590] text-[#f1c40f] rounded-full shrink-0">
            <Send className="w-6 h-6 rotate-45" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#073590]">
              Subscribe now to get our best deals delivered straight to your inbox.
            </h4>
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-[#073590] font-bold">✔</span> Be first to know about seat sales.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#073590] font-bold">✔</span> Receive flight sales and promotions straight to your inbox.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full md:w-auto items-center gap-2">
          <input
            className="text-xs px-3 py-2 border border-gray-300 rounded focus:ring-[#073590] focus:border-[#073590] w-full md:w-56 bg-white"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-100 border border-[#073590] text-[#073590] hover:bg-[#073590] hover:text-white font-bold text-xs px-4 py-2 rounded transition whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            {subscribed ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Subscribed!</span>
              </>
            ) : (
              <span>Sign me up!</span>
            )}
          </button>
        </form>
      </div>
    </aside>
  );
};
