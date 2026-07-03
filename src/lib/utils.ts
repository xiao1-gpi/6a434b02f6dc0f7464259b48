type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function toVal(mix: ClassValue): string {
  let k: string;
  let y: string;
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (let i = 0; i < mix.length; i++) {
        if (mix[i]) {
          y = toVal(mix[i]);
          if (y) str && (str += ' '), str += y;
        }
      }
    } else if (mix) {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' '), str += k;
        }
      }
    }
  }

  return str;
}

export function cn(...inputs: ClassValue[]) {
  let i = 0;
  let tmp: ClassValue;
  let x: string;
  let str = '';
  const len = inputs.length;
  for (; i < len; i++) {
    tmp = inputs[i];
    if (tmp) {
      x = toVal(tmp);
      if (x) str && (str += ' '), str += x;
    }
  }
  return str;
}
