// packages/cli/helpers/package-json.ts
import { version } from "@constants/version";
import { Prompts } from "@interfaces/prompts";

export class PackageJson extends Prompts {
  public write(): boolean {
    const file = this.path.join(this.folder, "package.json");
    this.fs.mkdirSync(this.folder, { recursive: true });
    const hasPackageJson = this.fs.existsSync(file);

    if (!hasPackageJson) {
      const content = {
        name: this.gameName === "." ? "airaga-game" : this.gameName,
        version: "1.0.0",
        main: "src/start.arg",
        type: "module",
        scripts: {
          build: "airaga build",
          dev: "airaga dev",
        },
        devDependencies: {
          airaga: `^${version}`,
          "@types/node": "^18.11.18",
          typescript: "^5.0.4",
        },
        license: "MIT",
        types: "airaga.config.ts",
      };

      this.fs.writeFileSync(file, JSON.stringify(content, null, 2));
    }

    return hasPackageJson;
  }
}