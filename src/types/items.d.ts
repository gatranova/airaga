/* eslint-disable no-unused-vars */

/**
 * @module index
 *
 * @description
 * Airaga Items is a tool to make it easier for text game
 * developers to search or (possibly) change the value of an item.
 *
 * @author
 * Rafi Abiyyu Airlangga
 */


declare module "@airaga/items" {
  export type ItemID = string;
  
  export interface Item {
    /**
     * Unique identifier for the item.
     */
    id: ItemID;

    /**
     * The display name of the item shown to the player.
     */
    name: string;

    /**
     * Optional description that provides more detail about the item.
     */
    description?: string;

    /**
     * Optional numeric value that can represent price, power, weight, etc.
     */
    value?: number;

    /**
     * Indicates whether the item can be used (e.g. consumed, equipped, activated).
     */
    usable?: boolean;

    /**
     * Any additional custom fields relevant to the game logic.
     */
    [key: string]: unknown;
  }

  export interface Character {
    /**
     * Unique identifier for the character.
     */
    id: string;

    /**
     * The display name of the character shown to the player.
     */
    name: string;

    /**
     * List of item IDs in the character's inventory.
     */
    inventory: ItemID[];

    /**
     * Optional numeric value that can represent health, power, weight, etc.
     */
    stats?: Record<string, number>;

    /**
     * Any additional custom fields relevant to the game logic.
     */
    [key: string]: unknown;
  }

  export interface Module {
    /**
     * @param id
     *
     * @description
     * When retrieving an item by ID, the module will return the item if it exists.
     */
    getItemById(id: ItemID): Item | undefined;

    /**
     * @param item
     *
     * @description
     * When adding an item, the module will add the item to the list of items.
     */
    addItem(item: Item): void;

    /**
     * @param id
     * @param updates
     *
     * @description
     * When updating an item by ID, the module will update the item if it exists.
     */
    updateItem(id: ItemID, updates: Partial<Item>): void;

    /**
     * @param id
     *
     * @description
     * When removing an item by ID, the module will remove the item if it exists.
     */
    removeItem(id: ItemID): void;

    /**
     * @param id
     *
     * @description
     * When retrieving a character by ID, the module will return the character if it exists.
     */
    getCharacterById(id: string): Character | undefined;

    /**
     * @param character
     *
     * @description
     * When adding a character, the module will add the character to the list of characters.
     */
    addCharacter(character: Character): void;

    /**
     * @param id
     * @param updates
     *
     * @description
     * When updating a character by ID, the module will update the character if it exists.
     */
    updateCharacter(id: string, updates: Partial<Character>): void;

    /**
     * @param id
     *
     * @description
     * When removing a character by ID, the module will remove the character if it exists.
     */
    removeCharacter(id: string): void;
  }

  const items = new Map<ItemID, Item>();
  const characters = new Map<string, Character>();

  export const Events: Module = {
    getItemById: (id) => items.get(id),
    addItem: (item) => items.set(item.id, item),
    updateItem: (id, updates) => items.get(id) && items.set(id, { ...items.get(id), ...updates }),
    removeItem: (id) => items.delete(id),
    getCharacterById: (id) => characters.get(id),
    addCharacter: (char) => characters.set(char.id, char),
    updateCharacter: (id, updates) => characters.get(id) && characters.set(id, { ...characters.get(id), ...updates }),
    removeCharacter: (id) => characters.delete(id),
  };
}