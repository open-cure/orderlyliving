import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import amyHeadshot1 from '../images/headshots/Amy-Final-Headshots-01.jpg';

export default function MeetAmy() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero / Intro */}
      <section className="pt-10 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Photo with O overlay — sticky column, centered in viewport minus nav */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:sticky hidden lg:flex"
              style={{ top: 'calc((100vh - 670px) / 2)', height: 670, alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Locked group: O + photo centered together */}
              <div className="relative flex items-center justify-center" style={{ width: 670, height: 670 }}>
                {/* Circular photo */}
                <div
                  className="rounded-full overflow-hidden shadow-xl"
                  style={{ width: 516, height: 516, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <img
                    src={amyHeadshot1}
                    alt="Amy Skardon"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Cormorant Garamond "O" as decorative frame — filled with brand color */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                    fontWeight: 300,
                    fontSize: 824,
                    lineHeight: 1,
                    color: '#B7A89C',
                    letterSpacing: 0,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, calc(-50% - 5px))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  O
                </span>
              </div>
            </motion.div>

            {/* Mobile: photo centered normally */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center lg:hidden"
            >
              <div className="relative flex items-center justify-center" style={{ width: 670, height: 670 }}>
                <div
                  className="rounded-full overflow-hidden shadow-xl"
                  style={{ width: 516, height: 516, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <img
                    src={amyHeadshot1}
                    alt="Amy Skardon"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
                    fontWeight: 300,
                    fontSize: 824,
                    lineHeight: 1,
                    color: '#B7A89C',
                    letterSpacing: 0,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, calc(-50% - 5px))',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  O
                </span>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl sm:text-5xl font-serif text-brand-dark mb-4">
                Meet Amy
              </h1>
              <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8">
                Helping Life's Transitions Feel Calm, Comfortable, and Orderly
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Amy's passion for creating calm, intentional spaces comes from deeply personal experience. When her father, living with dementia, transitioned into assisted living, she and her sister carefully curated his new environment to match his cognitive needs. By surrounding him with family photos, heirlooms, artwork, and memorabilia, including his vintage car collection, they helped him reconnect with his past and feel a sense of familiarity and comfort. The moment he walked into the room, his eyes lit up — a spark of recognition and joy that reminded Amy how powerful thoughtfully organized spaces can be.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Her first client in the senior transitions space involved a couple moving into assisted living. Many seniors feel anxiety, fear, or loss during this process, but Amy was able to tailor their environment to what mattered most to them. She curated the husband's office with TWA memorabilia honoring his career as a pilot, and throughout the home displayed family photos, favorite artwork, and cherished personal items. By minimizing clutter while preserving meaningful objects, she created a warm, welcoming space. When the husband saw his new home, he said:
              </p>

              <blockquote className="text-xl font-medium text-brand-dark italic border-l-4 border-gold-500 pl-6 py-2 mb-6">
                "Aww… it feels like home."
              </blockquote>

              <p className="text-gray-700 leading-relaxed mb-8">
                Moments like this cemented Amy's philosophy: transitions, whether big or small, can be exciting and joyful when approached thoughtfully.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  to={createPageUrl('Transitions')}
                  className="bg-azure hover:bg-azure-dark text-white px-6 py-3 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Senior Transitions
                </Link>
                <Link
                  to={createPageUrl('Contact')}
                  className="bg-white hover:bg-gray-50 text-sage-800 px-6 py-3 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg border border-sage-200"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
