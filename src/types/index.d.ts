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

declare module "airaga" {
  export interface Config {
    /**
     * Unique identifier of the game (UUID v4).
     */
    ifid: string;

    /**
     * Name or title of the game.
     */
    name: string;

    /**
     * Short description of the game.
     */
    description: string;

    /**
     * Game genres. Can be a single string or list of tags.
     * Example: "adventure", ["mystery", "sci-fi"]
     */
    genre: string | string[] | null;

    /**
     * Current version of the game.
     */
    version: string;

    /**
     * Author(s) of the game.
     */
    author: string | string[] | Array<string>;

    /**
     * Supported language(s) for localization.
     * Example: "en", ["en", "id"]
     */
    language?: string | string[];

    /**
     * Whether the game supports autosave.
     */
    autosave?: boolean;
  }

  export interface AiragaElement {
    /**
     * Game menu definition, with option key → label.
     * Example: { "new": "Start New Game", "continue": "Continue" }
     */
    menu: Partial<Record<string, string>>;

    /**
     * Scene content. Can include markup/tags or be pure text.
     */
    scene: string;

    /**
     * Tags associated with the scene (for filtering or branching).
     */
    tags?: string[];

    /**
     * ID of the scene (useful for jumps, branching).
     * This is used as a reference between scenes.
     * For example, if you want the next: “intro” from another scene.
     */
    id?: string;

    /**
     * Optional choices leading to other scenes.
     * Example: [{ label: "Go left", next: "scene2" }]
     */
    choices?: Array<{ label: string; next: string }>;

    /**
     * Optional background music or sound effect cue.
     */
    audio?: string;

    /**
     * Whether this scene is skippable (used in cutscenes).
     */
    skippable?: boolean;
  }
}