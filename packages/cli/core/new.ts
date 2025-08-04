import { version } from "@cli-constants/version";
import { Readme } from "@cli-helpers/readme";
import { Config } from "@cli-interfaces/config";
import { Prompts } from "@cli-interfaces/prompts";
import { PackageJson } from "@cli-helpers/package-json";
import { assetsFolder } from "@cli-helpers/paths";

export class New extends Prompts {
  private readme!: Readme;
  private packageJson!: PackageJson;

  public async new(gameName: string): Promise<void> {
    this.gameName = gameName;

    // Check if the folder already exists.
    if (gameName !== "." && Boolean(this.fs.existsSync(this.folder))) {
      this.console.error(`❌ Folder "${gameName}" already exists.`);
      this.process.exit(1);
    }

    if (gameName !== ".") {
      this.fs.mkdirSync(this.folder, { recursive: true });
    }

    // Helper initialization
    const ctx = {
      console: this.console,
      dedent: this.dedent,
      fs: this.fs,
      gameName: this.gameName,
      path: this.path,
      process: this.process,
    };

    this.readme = Object.assign(new Readme(), ctx);
    this.packageJson = Object.assign(new PackageJson(), ctx);
    await this.initializeFolder(gameName);
  }

  private async initializeFolder(gameName: string): Promise<void> {
    const init: Config = {
      ifid: null,
      name: gameName,
      description: "A new Airaga text game project.",
      version: `"${version}"`,
      author: "Rafi Abiyyu Airlangga",
    };

    this.fs.mkdirSync(this.path.join(this.folder, "public"), { recursive: true });

    const faviconPath = this.path.resolve(assetsFolder, "favicon.ico");

    if (!this.fs.existsSync(faviconPath)) {
      this.console.error("❌ Default favicon.ico not found in assets/");
      this.process.exit(1);
    }

    try {
      this.fs.copyFileSync(faviconPath, this.path.join(this.folder, "public", "favicon.ico"));
    } catch (err) {
      this.console.error(`❌ Failed to copy favicon: ${err}`);
      this.process.exit(1);
    }

    this.fs.mkdirSync(this.path.join(this.folder, "src", "scene"), { recursive: true });
    this.fs.writeFileSync(this.path.join(this.folder, "src", "scene", "1.arg"), this.dedent(
      `
        <scene>
          This is the 2nd scene from your game.
        </scene>
      `
    ));

    this.fs.writeFileSync(this.path.join(this.folder, "airaga.config.ts"), this.dedent(
      `
        import type { Config } from "airaga";

        export const config: Config = {
          ifid: ${null},
          name: "${init.name}",
          description: "${init.description}",
          version: ${init.version},
          author: "${init.author}",
        };
      `
    ));

    // Buat file .gitignore
    this.fs.writeFileSync(this.path.join(this.folder, ".gitignore"), `/node_modules`);

    // Buat package.json dan README.md
    this.packageJson.write();
    this.readme.write();
  }
}