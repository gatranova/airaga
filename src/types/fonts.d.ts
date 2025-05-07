/* eslint-disable no-unused-vars */

/**
 * @module @airaga/fonts
 *
 * @description
 * `@airaga/fonts` is an extension module for Airaga that allows you to easily
 * import and manage web fonts, primarily sourced from Google import("@/types/styles.d.ts").Fonts.
 * It provides helper functions to configure font loading strategies and improve performance.
 *
 * @author
 * Rafi Abiyyu Airlangga
 *
 * @note
 * More fonts and customizations will be added in future releases.
 *
 * @license
 * MIT
 *
 * @version 1.0.0
 *
 * @namespace @airaga/fonts
 *
 * How to use?
 * The concept of @airaga/fonts is similar to next/font/google.
 * Example:
 *
 * ```ts
 * import { Plus_Jakarta_Sans } from "@airaga/fonts";
 *
 * export const config: Config = {
 *   ifid: null,
 *   name: "example",
 *   description: "A new Airaga text game project.",
 *   version: "1.0.0",
 *   author: "Someone",
 *   fonts: () => Plus_Jakarta_Sans({
 *     display: "swap",
 *     subsets: ["latin"], 
 *   }),
 * };
 * ```
 */
declare module "@airaga/fonts" {
  export declare function Roboto(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Tagesschrift(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Coral_Pixels(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Cal_Sans(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Open_Sans(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Noto_Sans_Japanese(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Sansation(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Montserrat(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Inter(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Comic_Relief(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Poppins(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Lato(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Times_New_Roman(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Plus_Jakarta_Sans(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;

  export declare function Playfair_Display(options?: Partial<import("@/types/styles.d.ts").Fonts>): import("@/types/styles.d.ts").Fonts;
}