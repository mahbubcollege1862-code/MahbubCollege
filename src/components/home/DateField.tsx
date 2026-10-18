'use client';

import React, { useRef } from 'react';
import { CalendarDays } from 'lucide-react';

/** Converts "dd/mm/yyyy" to "yyyy-mm-dd", or returns null if it is not a real date in the past. */
export function dmyToIso(text: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const date = new Date(year, month - 1, day);
  const real = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  if (!real || year < 1850 || date.getTime() > Date.now()) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function isoToDmy(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}

/** Keeps only digits and inserts the slashes while typing: 15031990 -> 15/03/1990 */
function maskDmy(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

interface Props {
  name: string;
  /** Text in dd/mm/yyyy form (may be partial while typing) */
  value: string;
  onChange: (text: string) => void;
  className?: string;
  required?: boolean;
}

/**
 * Date input that always shows dd/mm/yyyy regardless of the browser's language settings. Members can
 * type the date or pick it from the calendar button.
 */
export default function DateField({ name, value, onChange, className = '', required }: Props) {
  const pickerRef = useRef<HTMLInputElement>(null);
  const iso = dmyToIso(value) ?? '';

  const openPicker = () => {
    const picker = pickerRef.current;
    if (!picker) return;
    if (typeof picker.showPicker === 'function') picker.showPicker();
    else picker.focus();
  };

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        inputMode="numeric"
        autoComplete="bday"
        placeholder="dd/mm/yyyy"
        maxLength={10}
        required={required}
        value={value}
        onChange={(e) => onChange(maskDmy(e.target.value))}
        className={`${className} pr-12`}
      />
      <button
        type="button"
        onClick={openPicker}
        aria-label="Open calendar"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#800000] cursor-pointer"
      >
        <CalendarDays className="w-5 h-5" />
      </button>
      {/* Native calendar, used only for picking; the text box above is what the member sees */}
      <input
        ref={pickerRef}
        type="date"
        tabIndex={-1}
        aria-hidden="true"
        value={iso}
        max={new Date().toISOString().slice(0, 10)}
        onChange={(e) => onChange(isoToDmy(e.target.value))}
        className="absolute right-2 bottom-0 w-0 h-0 opacity-0 pointer-events-none"
      />
    </div>
  );
}
