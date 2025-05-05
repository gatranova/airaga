/**
 * @module airaga
 *
 * @description
 * Airaga is an opinionated text game engine built with TypeScript.
 * It is designed to simplify and accelerate the development of interactive fiction
 * by providing a structured scene-based architecture.
 *
 * @author
 * Rafi Abiyyu Airlangga
 *
 * @license
 * MIT
 *
 * @repository
 * https://github.com/a6iyyu/airaga
 *
 * @version
 * 1.0.0
 *
 * @since
 * 2025
 */

/**
 * @name Choice
 *
 * @description
 * Choice type definition.
 */
interface Choice {
  label: string;
  next: string;
  condition?: string;
}

/**
 * @name VirtualElement
 *
 * @description
 * JSX Element type definition.
 */
interface VirtualElement {
  type: string;
  props?: Record<string, string | unknown>;
  children?: VirtualElement[] | string;
}

declare module "airaga" {
  export interface Config {
    /**
     * Unique identifier of the game (UUID v4).
     */
    ifid: string | null;

    /**
     * Name or title of the game.
     */
    name: string;

    /**
     * Short description of the game.
     */
    description: string;

    /**
     * Current version of the game.
     */
    version: string;

    /**
     * Author(s) of the game.
     */
    author: string | string[];

    /**
     * Supported language(s) for localization.
     * Example: "en", ["en", "id"]
     */
    language?: string | string[];

    /**
     * Whether the game supports autosave.
     */
    autosave?: boolean;

    /**
     * Theme of the game (light, dark, system).
     * Default: "dark"
     */
    theme?: "light" | "dark" | "system";

    /**
     * ID of the starting scene.
     * Default: "start"
     */
    startScene?: string;
  }

  export interface AiragaElement {
    /**
     * @description
     * Game menu definition, with option key → label.
     *
     * @example
     * <menu new="Start New Game" continue="Continue" />
     */
    menu?: Array<Record<string, string>>;

    /**
     * @description
     * Scene content. Can include markup/tags or be pure text.
     *
     * @example
     * <scene>
     *   Hello, world!
     * </scene>
     */
    scene?: string;

    /**
     * @description
     * ID of the scene (useful for jumps, branching).
     * This is used as a reference between scenes.
     * For example, if you want the next: “intro” from another scene.
     */
    id?: string | number;

    /**
     * @description
     * Optional choices leading to other scenes.
     *
     * @example
     * <choices={[{ label: "Go left", next: "scene2" }]} />
     */
    choices?: Choice[];

    /**
     * @description
     * Optional background music or sound effect cue.
     * It looks like <audio /> in HTML.
     *
     * @example
     * <audio src="audio.mp3" />
     */
    audio?: VirtualElement;

    /**
     * Break line element.
     * It looks like <br /> in HTML.
     */
    br?: VirtualElement;

    /**
     * Horizontal rule element.
     * It looks like <hr /> in HTML.
     */
    hr?: VirtualElement;

    /**
     * Image element.
     * It looks like <img /> in HTML.
     */
    img?: VirtualElement;

    /**
     * Optional onEnter function.
     * This function will be called when the scene is entered.
     */
    onEnter?: () => void;
  }
}