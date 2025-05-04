/* eslint-disable no-unused-vars */

/**
 * @module @airaga/fonts
 * 
 * @description
 * `@airaga/fonts` is an extension module for Airaga that allows you to easily
 * import and manage web fonts, primarily sourced from Google Fonts.
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
 * @version
 * 1.0.0
 *
 * @since
 * 2025
 */

import type { Fonts } from "@/types/styles.js";

/**
 * @namespace @airaga/fonts
 * 
 * How to use?
 * The concept of @airaga/fonts is similar to next/font/google.
 * Example:
 * const fonts = Plus_Jakarta_Sans({
 *   subsets: ["latin"],
 *   weight: ["400", "500", "600", "700", "800"],
 * });
 */
declare module "@airaga/fonts" {
  export declare function Roboto(options?: Partial<Fonts>): Fonts;

  export declare function Tagesschrift(options?: Partial<Fonts>): Fonts;

  export declare function Coral_Pixels(options?: Partial<Fonts>): Fonts;

  export declare function Cal_Sans(options?: Partial<Fonts>): Fonts;

  export declare function Open_Sans(options?: Partial<Fonts>): Fonts;

  export declare function Noto_Sans_Japanese(options?: Partial<Fonts>): Fonts;

  export declare function Sansation(options?: Partial<Fonts>): Fonts;

  export declare function Montserrat(options?: Partial<Fonts>): Fonts;

  export declare function Inter(options?: Partial<Fonts>): Fonts;

  export declare function Comic_Relief(options?: Partial<Fonts>): Fonts;

  export declare function Poppins(options?: Partial<Fonts>): Fonts;

  export declare function Lato(options?: Partial<Fonts>): Fonts;

  export declare function Times_New_Roman(options?: Partial<Fonts>): Fonts;

  export declare function Plus_Jakarta_Sans(options?: Partial<Fonts>): Fonts;

  export declare function Playfair_Display(options?: Partial<Fonts>): Fonts;
}