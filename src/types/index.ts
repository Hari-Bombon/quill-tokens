export type QuillTokenType =
  | "borderRadius" // done
  | "borderWidth" // done
  | "boxShadow" // done
  | "color" // done
  | "opacity" // done
  | "spacing" // done
  | "fontSizes" // done
  | "fontFamilies" // done
  | "fontWeights" // done
  | "lineHeights" // done
  | "textDecoration" // should be removed we don't need this
  | "paragraphSpacing"; // done

export type NestedObj<T extends Record<string, any>> = {
  [P in keyof T]: Record<P, NestedObj<T>> | T[P];
};

type ValueOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

function stringUnionToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements;
}

/* USAGE */

// This is what You want!! :)
let TokenTypesValues = stringUnionToArray<QuillTokenType>()(
  "borderRadius",
  "borderWidth",
  "boxShadow",
  "color",
  "opacity",
  "spacing",
  "fontSizes",
  "fontFamilies",
  "fontWeights",
  "lineHeights",
  "textDecoration",
  "paragraphSpacing"
);
