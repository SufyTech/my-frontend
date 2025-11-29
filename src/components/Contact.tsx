import React, { useState, FormEvent } from "react";
import { Mail, User, MessageSquare, Loader, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    setLoading(true);
    setSuccessMsg(""); // reset

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setSuccessMsg("Message sent successfully — we will get back to you shortly.");
        form.reset();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-black relative border-t border-white/10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-violet-600/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
            Have questions, feedback, or collaboration ideas? We’d love to hear
            from you.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl max-w-2xl mx-auto shadow-xl hover:bg-white/10 transition">

          {/* SUCCESS MESSAGE UI */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 flex items-center gap-3 animate-fadeIn">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm">{successMsg}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 mb-2 text-sm">
                <User className="w-4 h-4" />
                Your Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-slate-200 focus:border-violet-500 outline-none transition duration-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 mb-2 text-sm">
                <Mail className="w-4 h-4" />
                Your Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-slate-200 focus:border-blue-500 outline-none transition duration-300"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 mb-2 text-sm">
                <MessageSquare className="w-4 h-4" />
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-slate-200 focus:border-violet-500 outline-none transition duration-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90 transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
