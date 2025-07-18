'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const numberVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    y: 15,
    rotate: direction * 5,
  }),
  visible: {
    opacity: 0.7,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const ghostVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    y: 15,
    rotate: -5,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  hover: {
    scale: 1.1,
    y: -10,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      rotate: {
        duration: 2,
        ease: 'linear',
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
      },
    },
  },
  floating: {
    y: [-5, 5],
    transition: {
      y: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
      },
    },
  },
};

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          animate="visible"
          className="text-center"
          exit="hidden"
          initial="hidden"
          variants={containerVariants}
        >
          <div className="mb-8 flex items-center justify-center gap-4 md:mb-12 md:gap-6">
            <motion.span
              className="select-none font-bold font-signika text-[80px] text-primary opacity-70 md:text-[120px]"
              custom={-1}
              variants={numberVariants}
            >
              4
            </motion.span>
            <motion.div
              animate={['visible', 'floating']}
              variants={ghostVariants}
              whileHover="hover"
            >
              <Image
                alt="Ghost"
                className="h-[80px] w-[80px] select-none object-contain md:h-[120px] md:w-[120px]"
                draggable="false"
                height={120}
                priority
                src="/ghost.png"
                width={120}
              />
            </motion.div>
            <motion.span
              className="select-none font-bold font-signika text-[80px] text-primary opacity-70 md:text-[120px]"
              custom={1}
              variants={numberVariants}
            >
              4
            </motion.span>
          </div>

          <motion.h1
            className="mb-4 select-none font-bold font-dm-sans text-3xl text-foreground opacity-70 md:mb-6 md:text-5xl"
            variants={itemVariants}
          >
            Boo! Page missing!
          </motion.h1>

          <motion.p
            className="mb-8 select-none font-dm-sans text-foreground text-lg opacity-50 md:mb-12 md:text-xl"
            variants={itemVariants}
          >
            Whoops! This page must be a ghost - it&apos;s not here!
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
          >
            <Link
              className="inline-block select-none rounded-full bg-primary px-8 py-3 font-dm-sans font-medium text-foreground text-lg transition-colors hover:bg-primary/80"
              href="/dashboard"
            >
              Go To Dashboard
            </Link>
          </motion.div>

          <motion.div className="mt-12" variants={itemVariants}>
            <Link
              className="select-none font-dm-sans text-foreground underline opacity-50 transition-opacity hover:opacity-70"
              href="#"
            >
              What means 404?
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
