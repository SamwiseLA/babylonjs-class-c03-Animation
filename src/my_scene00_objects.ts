import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import MyScene from "./my_scene00";
import earcut from "./earcut/src/earcut.js";
import * as GUI from "babylonjs-gui";

export default class MySceneObjects {
  public appMain: MyScene;
  public playing = false;

  TestModule(): void {
    console.log(`>=====>\n      In Module: ${this.constructor.name}\n>=====>`);
  }

  SpawnTestBox(): BABYLON.Mesh {
    this.appMain.METHMod.DMM("SpawnBox");

    const mat = new BABYLON.StandardMaterial("Material", this.appMain._scene);
    mat.diffuseColor = BABYLON.Color3.Green();

    // Our built-in 'box' shape. Params: name, options, scene
    const box = BABYLON.MeshBuilder.CreateBox("box", {});

    box.material = mat;

    box.scaling = new BABYLON.Vector3(0.5, 1.5, 0.5);

    box.position.y = box.scaling.y / 2; //box created with default size so height is 1
    box.position.z = -4;
    box.position.x = -4;

    // Move the sphere upward 1/2 its height
    //this.appMain.box.position.y = 2;    //this.appMain.box.position = new BABYLON.Vector3(0, 0.5, -5);

    //this.appMain.box.rotation = this._light.direction;
    //this.appMain.box.scaling.x = .1;
    //this.appMain.box.scaling.z = 0.1;

    const meshPosition = new BABYLON.Vector3(0, 0.7, -0.5);
    const meshScaling = new BABYLON.Vector3(
      1 / box.scaling.x,
      1 / box.scaling.y,
      1 / box.scaling.z
    );

    var textMesh = this.appMain.METHMod.DisplayText(
      "Green Single Global Box",
      undefined,
      undefined,
      undefined,
      "black",
      "green"
    );
    textMesh.position = meshPosition;
    textMesh.scaling = meshScaling;
    textMesh.parent = box;

    return box;
  }

  SpawnButton(): void {
    this.appMain.METHMod.DMM("SpawnButton");

    var manager = new GUI.GUI3DManager();
    // Text only button

    const onTexture =
      "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOn.png";
    const offTexture =
      "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOff.png";

    var touchHoloTextButton = new GUI.HolographicButton("TouchHoloTextButton");
    manager.addControl(touchHoloTextButton);

    touchHoloTextButton.position = new BABYLON.Vector3(0, 0.5, -2);
    const unClicked = "Click Music! On";
    touchHoloTextButton.text = unClicked;
    touchHoloTextButton.imageUrl = offTexture;
    touchHoloTextButton.onPointerDownObservable.add(() => {
      this.appMain.METHMod.PlaySound();
      //alert("I was Clicked!!!")
      this.EnvironmentSound();

      if (touchHoloTextButton.text === unClicked) {
        touchHoloTextButton.imageUrl = onTexture;
        touchHoloTextButton.text = "Click Music! Off";
      } else {
        touchHoloTextButton.text = unClicked;
        touchHoloTextButton.imageUrl = offTexture;
      }
    });
  }

  SpawnButtonAnimation(): void {
    this.appMain.METHMod.DMM("SpawnButtonAnimation");

    var manager = new GUI.GUI3DManager();
    // Text only button

    const onTexture =
      "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOn.png";
    const offTexture =
      "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOff.png";

    var touchHoloTextButton = new GUI.HolographicButton("TouchHoloTextButton");
    manager.addControl(touchHoloTextButton);

    touchHoloTextButton.position = new BABYLON.Vector3(2.25, 0.125, -4.25);
    touchHoloTextButton.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
    //touchHoloTextButton.mesh.rotation.y = BABYLON.Tools.ToRadians(45);

    const unClicked = "Click Car 1! On";
    touchHoloTextButton.text = unClicked;
    touchHoloTextButton.imageUrl = offTexture;
    touchHoloTextButton.onPointerDownObservable.add(async () => {
      this.appMain.METHMod.PlaySound();
      this.appMain.ACTMod.ToggleWheelAnimation();
      this.appMain.ACTMod.ToggleObjectAnimation(this.appMain.car[0]);

      if (touchHoloTextButton.text === unClicked) {
        touchHoloTextButton.imageUrl = onTexture;
        touchHoloTextButton.text = "Click Car 1! Off";
        this.appMain.METHMod.PlaySound(
          "https://dl.dropbox.com/s/3ug19nwt5oiea2n/ford-v8-5-liter-engine.wav",
          undefined,
          true,
          1
        );
      } else {
        await this.appMain.METHMod.sound[1].dispose();
        touchHoloTextButton.text = unClicked;
        touchHoloTextButton.imageUrl = offTexture;
      }
    });
  }

  SpawnButtonAnimation2(): void {
    this.appMain.METHMod.DMM("SpawnButtonAnimation2");

    var manager = new GUI.GUI3DManager();
    // Text only button

    const onTexture =
      "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOn.png";
    const offTexture =
      "https://raw.githubusercontent.com/microsoft/MixedRealityToolkit-Unity/main/Assets/MRTK/SDK/StandardAssets/Textures/IconSwitchOff.png";

    var touchHoloTextButton = new GUI.HolographicButton("TouchHoloTextButton");
    manager.addControl(touchHoloTextButton);

    touchHoloTextButton.position = new BABYLON.Vector3(2.5, 0.125, -4.25);
    touchHoloTextButton.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
    //touchHoloTextButton.mesh.rotation.y = BABYLON.Tools.ToRadians(45);

    const unClicked = "Click Car 2! On";
    touchHoloTextButton.text = unClicked;
    touchHoloTextButton.imageUrl = offTexture;
    touchHoloTextButton.onPointerDownObservable.add(async () => {
      this.appMain.METHMod.PlaySound();
      this.appMain.ACTMod.ToggleWheelAnimation(1);
      this.appMain.ACTMod.ToggleObjectAnimation(this.appMain.car[1]);

      if (touchHoloTextButton.text === unClicked) {
        touchHoloTextButton.imageUrl = onTexture;
        touchHoloTextButton.text = "Click Car 2! Off";
        this.appMain.METHMod.PlaySound(
          "https://dl.dropbox.com/s/3ug19nwt5oiea2n/ford-v8-5-liter-engine.wav",
          undefined,
          true,
          1
        );
      } else {
        this.appMain.METHMod.sound[1].dispose();
        touchHoloTextButton.text = unClicked;
        touchHoloTextButton.imageUrl = offTexture;
      }
    });
  }

  BuildCar(): BABYLON.Mesh {
    this.appMain.METHMod.DMM("BuildCar");

    const carMat = new BABYLON.StandardMaterial("carMat", this.appMain._scene);
    //carMat.diffuseColor = new BABYLON.Color3(0,150/255,1);
    //carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png", this.appMain._scene);
    carMat.diffuseTexture = new BABYLON.Texture(
      "https://dl.dropbox.com/s/6wjwucpcrwuer61/as_car.png",
      this.appMain._scene
    );

    const wheelMat = new BABYLON.StandardMaterial(
      "carMat",
      this.appMain._scene
    );
    wheelMat.diffuseColor = new BABYLON.Color3(1, 200 / 255, 0);
    wheelMat.diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/wheel.png",
      this.appMain._scene
    );

    const carBodyLen = 3.5;
    const carBodyHgt = 1.25;
    const carFrontLen = 3;
    const carBodyDepth = 2;

    const carBodyMesh = this.ExtrudeMesh(
      carBodyLen,
      carBodyHgt,
      carFrontLen,
      carBodyDepth,
      -3,
      -3
    );

    carBodyMesh.name = `${carBodyMesh.name}0`;

    carBodyMesh.material = carMat;

    carBodyMesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    const carBodyText = this.appMain.METHMod.DisplayText(
      "Extruded Mesh for Car Body & CreateCylinder for Wheels"
    );
    carBodyText.parent = carBodyMesh;
    carBodyText.position.y = 0.05;
    carBodyText.position.z = -2.8;
    carBodyText.rotation.x = BABYLON.Tools.ToRadians(90);

    carBodyText.scaling = new BABYLON.Vector3(3, 3, 3);

    this.appMain.wheels[0][0] = this.BuildWheels(carBodyLen / 4, 0.4);
    this.appMain.wheels[0][0].parent = carBodyMesh;
    this.appMain.wheels[0][0].name = "wheelLF0";
    this.appMain.wheels[0][0].material = wheelMat;
    this.appMain.wheels[0][0].position.x =
      carBodyMesh.position.x + (carBodyLen + carFrontLen) / 2 - carBodyLen / 4;
    this.appMain.wheels[0][0].position.y = -carBodyDepth;
    this.appMain.wheels[0][0].position.z = -3;

    this.appMain.wheels[0][1] = this.appMain.wheels[0][0].clone(
      "wheelLB0",
      carBodyMesh
    );
    this.appMain.wheels[0][1].position.x =
      -this.appMain.wheels[0][0].position.x;
    //this.appMain._scene.beginAnimation(this.appMain.wheels[0][1], 0, 0, false);

    this.appMain.wheels[0][2] = this.appMain.wheels[0][0].clone(
      "wheelRF0",
      carBodyMesh
    );
    this.appMain.wheels[0][2].position.y = 0;
    //this.appMain._scene.beginAnimation(this.appMain.wheels[0][2], 0, 0, false);

    this.appMain.wheels[0][3] = this.appMain.wheels[0][2].clone(
      "wheelRB0",
      carBodyMesh
    );
    this.appMain.wheels[0][3].position.x =
      -this.appMain.wheels[0][2].position.x;
    //this.appMain._scene.beginAnimation(this.appMain.wheels[0][3], 0, 0, false);

    return carBodyMesh;
  }

  async BuildCarFromMeshObject(): Promise<void> {

    this.appMain.METHMod.DMM("BuildCarFromMeshObject");

    await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "https://dl.dropbox.com/s/7xua5szli0k5hp0/",
      "as_car.glb"
    ).then(() => {
      const wheelLF = (this.appMain.wheels[1][0] =
        this.appMain._scene.getMeshByName("wheelLF"));
      const wheelLB = (this.appMain.wheels[1][1] =
        this.appMain._scene.getMeshByName("wheelLB"));
      const wheelRF = (this.appMain.wheels[1][2] =
        this.appMain._scene.getMeshByName("wheelRF"));
      const wheelRB = (this.appMain.wheels[1][3] =
        this.appMain._scene.getMeshByName("wheelRB"));
      console.log(this.appMain.wheels[1][0].animations);
      //this.appMain._scene.beginAnimation(wheelLF, 0, 30, true);
      //this.appMain._scene.beginAnimation(wheelLB, 0, 30, true);
      //this.appMain._scene.beginAnimation(wheelRF, 0, 30, true);
      //this.appMain._scene.beginAnimation(wheelRB, 0, 30, true);

      this.appMain._scene.beginAnimation(wheelLF, 0, 0, false);
      this.appMain._scene.beginAnimation(wheelLB, 0, 0, false);
      this.appMain._scene.beginAnimation(wheelRF, 0, 0, false);
      this.appMain._scene.beginAnimation(wheelRB, 0, 0, false);
    });

    const meshes = this.appMain._scene.getActiveMeshes();
    //this.appMain.car[1] = this.appMain._scene.getMeshByName("extrudeMesh");
    const meshesByID = this.appMain._scene.getMeshesByID("extrudeMesh");
    this.appMain.car[1] = meshesByID[2];
    this.appMain.car[1].rotation.y = BABYLON.Tools.ToRadians(90);

    //this.appMain.car[1].name = `${this.appMain.car[1].name}1`
    this.appMain.car[1].name = `${this.appMain.car[1].name}1`;

    const carBodyText = this.appMain.METHMod.DisplayText(
      " ImportMesh for Car2 "
    );
    carBodyText.parent = this.appMain.car[1];
    carBodyText.position.y = -2.05;
    carBodyText.position.z = 2.8;
    carBodyText.rotation.x = BABYLON.Tools.ToRadians(90);

    carBodyText.scaling = new BABYLON.Vector3(-3, -3, -3);

    return;
  }

  BuildWheels(diam = 0.125, hgt = 0.05): BABYLON.Mesh {
    this.appMain.METHMod.DMM("BuildWheels");

    const wheel = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {
      diameter: diam,
      height: hgt,
    });

    //Animate the Wheels
    const animWheel = new BABYLON.Animation(
      "wheelAnimation",
      "rotation.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const wheelKeys = [];

    //At the animation key 0, the value of rotation.y is 0
    wheelKeys.push({
      frame: 0,
      value: 0,
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
      frame: 30,
      value: 2 * Math.PI,
    });

    //set the keys
    animWheel.setKeys(wheelKeys);

    //Link this animation to a wheel
    wheel.animations = [];
    wheel.animations.push(animWheel);

    //this.appMain._scene.beginAnimation(wheel, 0, 30, true);

    return wheel;
  }

  ExtrudeMesh(
    bodyLength = 5,
    bodyHeight = 2,
    frontLength = 1.75,
    bodyDepth = 0.2,
    startX = 0,
    startZ = 0,
    showAngleMesh = false
  ): BABYLON.Mesh {
    this.appMain.METHMod.DMM("ExtrudeMesh");
    // Calc Mesh Extrude

    const extMat = new BABYLON.StandardMaterial("ExtMat", this.appMain._scene);
    extMat.diffuseColor = BABYLON.Color3.Yellow();

    const endZ = startZ + bodyHeight;

    var startX2 = startX + bodyLength + frontLength;

    const bodyStartX = startX + bodyLength;

    const distZ = endZ - startZ;

    const outline1 = [
      new BABYLON.Vector3(startX, 0, startZ),
      new BABYLON.Vector3(startX2, 0, startZ),
    ];
    const outline2 = [
      new BABYLON.Vector3(startX, 0, startZ),
      new BABYLON.Vector3(startX2, 0, startZ),
    ];

    //curved front
    const extrudes = 20;

    for (let i = 0; i < extrudes; i++) {
      var posX = frontLength * Math.cos((i * Math.PI) / (extrudes * 2));
      posX = frontLength - posX;
      posX = startX2 - posX;
      //const posz = distZ * Math.sin((i * Math.PI) / (extrudes * 2)) - frontLength
      var posZ = distZ * Math.sin((i * Math.PI) / (extrudes * 2));
      posZ = distZ - posZ;
      posZ = endZ - posZ;
      if (i === 0) {
        posZ = startZ;
      }

      outline1.push(new BABYLON.Vector3(posX, 0, posZ));
    }

    //top
    outline1.push(new BABYLON.Vector3(bodyStartX, 0, endZ));
    outline1.push(new BABYLON.Vector3(startX, 0, endZ));

    outline2.push(new BABYLON.Vector3(bodyStartX, 0, endZ));
    outline2.push(new BABYLON.Vector3(startX, 0, endZ));
    //back formed automatically

    //face UVs
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

    const extrudeMesh = BABYLON.MeshBuilder.ExtrudePolygon(
      "extrudeMesh",
      { shape: outline1, depth: bodyDepth, faceUV: faceUV, wrap: true },
      this.appMain._scene,
      earcut
    );

    extrudeMesh.material = extMat;

    extrudeMesh.position.y = 2;
    extrudeMesh.rotation = new BABYLON.Vector3(
      BABYLON.Tools.ToRadians(-90),
      BABYLON.Tools.ToRadians(0),
      BABYLON.Tools.ToRadians(0)
    );

    if (showAngleMesh) {
      const extrudeMeshChild = BABYLON.MeshBuilder.ExtrudePolygon(
        "extrudeMeshChild",
        { shape: outline2, depth: bodyDepth },
        this.appMain._scene,
        earcut
      );
      extrudeMeshChild.parent = extrudeMesh;
      extrudeMeshChild.position.y = -0.5 - (bodyDepth - 0.2);
    }

    return extrudeMesh;
  }

  // Environment Node Objects (Ground, Trees, Buildings, Sound)

  EnvironmentNodes(): void {
    this.appMain.METHMod.DMM("EnvironmentNodes");
    // Ground

    this.appMain.ground = BABYLON.MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });

    const mat = new BABYLON.StandardMaterial(
      "groundMaterial",
      this.appMain._scene
    );
    mat.diffuseTexture = new BABYLON.Texture(
      "https://www.babylonjs-playground.com/textures/floor.png",
      this.appMain._scene
    );

    this.appMain.ground.material = mat;
  }

  EnvironmentSound(): void {
    this.appMain.METHMod.DMM("EnvironmentSound");

    const uri =
      "https://dl.dropbox.com/s/rgm7xqiguux0t0d/Girl%20From%20Ipanema%20-%20Frank%20Sinatra.mp3";

    BABYLON.Engine.audioEngine?.unlock();

    if (this.playing) {
      if (this.appMain.music) {
        this.appMain.music.pause();
      }
    } else {
      if (!this.appMain.music) {
        this.appMain.music = new BABYLON.Sound(
          "sound1",
          uri,
          this.appMain._scene,
          null,
          { loop: true, autoplay: true, volume: 0.05 }
        );
      }
      this.appMain.music.play();
    }
    this.playing = !this.playing;
  }
}
