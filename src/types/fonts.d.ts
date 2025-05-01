/* eslint-disable no-unused-vars */

/**
 * @module @airaga/fonts
 * 
 * @description
 * `@airaga/fonts` is an extension module for Airaga that allows you to easily
 * import and manage web fonts, primarily sourced from Google Fonts.
 * It provides helper functions to configure font loading strategies and improve performance.
 * 
 * @note
 * More fonts and customizations will be added in future releases.
 * 
 * @license
 * MIT
 * 
 * @repository
 * https://github.com/a6iyyu/airaga
 * 
 * @since
 * 2025
 */

import type { CssVariable, Fonts } from "@types/styles";

declare module "@airaga/fonts" {
  export declare function Roboto(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Tagesschrift(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Coral_Pixels(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Cal_Sans(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Open_Sans(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Noto_Sans_Japanese(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Sansation(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Montserrat(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Inter(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Comic_Relief(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Poppins(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Lato(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Times_New_Roman(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Plus_Jakarta_Sans(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });

  export declare function Playfair_Display(options?: Partial<Fonts> & {
    variable?: CssVariable;
  }): string | (Fonts & { variable?: CssVariable });
}