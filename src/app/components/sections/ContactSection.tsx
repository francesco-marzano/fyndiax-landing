'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { FadeInUp } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

const schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  organisation: z.string().min(2, 'Organisation is required'),
  role: z.string().min(2, 'Role is required'),
  email: z.string().email('Valid email required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const iAmOptions = ['Corporate/industrial partner', 'University/research centre', 'Investor/family office', 'Entrepreneur/talent'];
const interestOptions = ['Thematic collaboration', 'Research-to-venture programmes', 'Investment opportunities', 'Joining a venture/builder'];

export function ContactSection() {
  const [selectedIAm, setSelectedIAm] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toggleChip = (value: string, selected: string[], setSelected: (v: string[]) => void) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Form:', { ...data, iAm: selectedIAm, interests: selectedInterests });
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setSelectedIAm([]);
    setSelectedInterests([]);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            white 20px,
            white 21px
          )`,
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Left: CTA */}
          <div>
            <FadeInUp>
              <span className="eyebrow mb-4 sm:mb-6 inline-flex">Get in Touch</span>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <SectionTypewriter 
                text="Let's turn real problems into ventures"
                highlightWords={['ventures']}
                className="mb-6 sm:mb-8"
              />
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-6 sm:mb-8">
                If you're a university, research centre, corporate or investor exploring 
                AI, food & agritech, biomaterials or circular manufacturing, we'd love 
                to discuss co-building science-backed ventures together.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <p className="text-text-muted">
                Or reach out directly at{' '}
                <a 
                  href="mailto:info@fyndiax.com" 
                  className="text-accent-primary hover:text-accent-secondary transition-colors animated-underline"
                >
                  info@fyndiax.com
                </a>
              </p>
            </FadeInUp>
          </div>

          {/* Right: Form */}
          <FadeInUp delay={0.2}>
            <div className="glass-panel p-5 sm:p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-kirevya/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-accent-kirevya" />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-2">
                    Thank you!
                  </h3>
                  <p className="text-text-tertiary">
                    We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Full name</label>
                    <input
                      {...register('fullName')}
                      className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                      placeholder="Your name"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Organisation</label>
                    <input
                      {...register('organisation')}
                      className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                      placeholder="Your organisation"
                    />
                    {errors.organisation && (
                      <p className="text-red-400 text-xs mt-1">{errors.organisation.message}</p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Role</label>
                    <input
                      {...register('role')}
                      className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                      placeholder="Your role"
                    />
                    {errors.role && (
                      <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Work email</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* I am */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2 sm:mb-3">I am</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {iAmOptions.map((option) => (
                        <motion.button
                          key={option}
                          type="button"
                          onClick={() => toggleChip(option, selectedIAm, setSelectedIAm)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all"
                          style={{
                            background: selectedIAm.includes(option)
                              ? 'var(--accent-gradient)'
                              : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${selectedIAm.includes(option)
                              ? 'transparent'
                              : 'var(--border-subtle)'}`,
                            color: selectedIAm.includes(option)
                              ? 'white'
                              : 'var(--text-muted)',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Interested in */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2 sm:mb-3">Interested in</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {interestOptions.map((option) => (
                        <motion.button
                          key={option}
                          type="button"
                          onClick={() => toggleChip(option, selectedInterests, setSelectedInterests)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all"
                          style={{
                            background: selectedInterests.includes(option)
                              ? 'var(--accent-gradient)'
                              : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${selectedInterests.includes(option)
                              ? 'transparent'
                              : 'var(--border-subtle)'}`,
                            color: selectedInterests.includes(option)
                              ? 'white'
                              : 'var(--text-muted)',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Message (optional)</label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      className="w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Submit
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
