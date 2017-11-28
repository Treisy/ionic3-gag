import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagenPreview:string;

constructor(private viewCtrl : ViewController, private camera : Camera, private imagePicker : ImagePicker) {
  }

  cerrar_modal() {
    this.viewCtrl.dismiss();
  }

  mostrar_camara() {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        // imageData is either a base64 encoded string or a file URI If it's base64:
        this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
        console.log( "Error en camara", JSON.stringify(err));
      });
  }

  seleccionar_foto() {
    let options: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }

    this
      .imagePicker
      .getPictures(options)
      .then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.imagenPreview = 'data:image/jpeg;base64,' + results[1];
        }
      }, (err) => {
        console.log("Error selector", JSON.stringify(err));
      });
  }

}
