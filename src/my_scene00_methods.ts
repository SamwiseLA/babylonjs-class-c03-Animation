import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";

export default class MySceneMethods {
  public appMain: MyScene;
  public sound: BABYLON.Sound;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  // Display Module And Method Name

  DMM(methodName: string) {
    console.log(`\n>=====>`);
    console.log(`      In Module: ${this.constructor.name}`);
    console.log(`         Method: ${methodName} \n>=====>`);
    console.log(`>=====>`);
  }

  DisplayText(
    text: string,
    width = 0,
    x = 5,
    y = 30,
    color = "black",
    clearColor = "white",
    font = "bold 22px monospace"
  ): BABYLON.Mesh {
    this.DMM("DisplayText");

    const textLen = text.length;
    const widthCalc = textLen / 45;

    var widthUse = width;
    if (width === 0){
      widthUse = widthCalc;
    }

    const groundWidth = 4 * (widthUse / 4);
    const groundHeight = .07;

    const mesh = BABYLON.MeshBuilder.CreatePlane(
      "textMesh",
      { width: groundWidth, height: groundHeight },
      this.appMain._scene
    );

    //Create dynamic texture
    const resolution = (512 + 256);
    const resolutionAdj = (512 + 256) / (4 / groundWidth)
    const textWidth = (resolutionAdj * 3);
    const textHeight = (resolution / 2) / 8;

    var textureText = new BABYLON.DynamicTexture( 
      "dynamicTextureText",
      { width: textWidth, height: textHeight },
      this.appMain._scene,
      false
    );
    var textureContext = textureText.getContext();

    var materialText = new BABYLON.StandardMaterial(
      "matText",
      this.appMain._scene
    );
    
    materialText. disableLighting = true;
    materialText.emissiveColor = BABYLON.Color3.White();

    //Add text to dynamic texture
    textureText.drawText(text, x, y, font, color, clearColor, true, true);

    materialText.diffuseTexture = textureText;
    mesh.material = materialText;

    return mesh;
  }

  async PlaySound(uri: string = undefined, vol = .2) {
    // Load Repeating the sound,
    // give it time to load and play it every 3 seconds
    //

    var name = "click"

    if (uri === undefined){
      uri = "https://dl.dropbox.com/s/4vma3tiuqa6bl86/448081__breviceps__tic-toc-click.wav";
      uri = "https://dl.dropbox.com/s/sduaedufegwqxdk/569621__selinam21__sound-5.mp3"
    } else {
      const indexLast = uri.lastIndexOf("/");
      if (indexLast === -1){
        return
      } else {
        name = uri.substring(indexLast + 1);
      }
    }

    if (this.sound !== undefined){
      await this.sound.dispose();
    }

    this.sound = new BABYLON.Sound(
      name,
      uri,
      this.appMain._scene,
      () => StartPlay(this.sound),
      { loop: false, autoplay: true, volume: vol }
    );

    function StartPlay(sound: BABYLON.Sound): void {
      sound.play();
    }
  
  }

  PlaySoundInterval(uri: string = undefined, interval = 3, vol = .2) {
    // Load Repeating the sound,
    // give it time to load and play it every 3 seconds
    //

    var name = "bounce"

    if (uri === undefined){
      uri = "https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1907681589261763077/" +
        "ogg_321808__lloydevans09__pvc-pipe-hit-3.ogg";
    } else {
      const indexLast = uri.lastIndexOf("/");
      if (indexLast === -1){
        return
      } else {
        name = uri.substring(indexLast + 1);
      }
    }

    const sound = new BABYLON.Sound(
      name,
      uri,
      this.appMain._scene,
      () => StartIntervalPlay(sound, interval),
      { loop: false, autoplay: true, volume: vol }
    );

    function StartIntervalPlay(sound: BABYLON.Sound, interval: number): void {
      interval = interval * 1000;
      setInterval(() => sound.play(), interval);
    }
  
  }

  public DelayIt = (secs: number) =>
    new Promise((res) => setTimeout(res, secs * 1000));
}
