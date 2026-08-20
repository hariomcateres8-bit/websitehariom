import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
  className = "",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[wordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText.length < targetWord.length) {
      // Typing
      timer = setTimeout(() => {
        setCurrentText(targetWord.slice(0, currentText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && currentText.length === targetWord.length) {
      // Pause at full word
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && currentText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setCurrentText(targetWord.slice(0, currentText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && currentText.length === 0) {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-block font-display font-extrabold ${className}`}>
      <span className="text-[#EA3808] drop-shadow-xs">{currentText}</span>
      <span className="inline-block w-[3px] h-[0.85em] bg-[#EA3808] ml-1 align-middle animate-pulse rounded-full shadow-[0_0_8px_rgba(234,56,8,0.4)]" />
    </span>
  );
}
