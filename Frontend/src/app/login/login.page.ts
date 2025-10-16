import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonImg,
  AlertController, 
  IonAlert // Aún se necesita en imports, aunque se use AlertController
} from '@ionic/angular/standalone';

// 🎯 IMPORTAR EL SERVICIO DE API
import { ApiService } from '../services/api'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonAlert, 
    IonContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonImg,
  ],
})
export class LoginPage implements OnInit {

  // 🎯 INYECTAR AlertController Y ApiService
  constructor(
    private alertController: AlertController,
    private apiService: ApiService // <-- Inyección del servicio
  ) {}

  ngOnInit() {
    // 🎯 LLAMAR A LA FUNCIÓN DE PRUEBA AL INICIAR LA PÁGINA
    this.testApiConnection(); 
  }

  /**
   * ✅ FUNCIÓN DE PRUEBA: Obtiene usuarios del backend y los muestra en la consola.
   */
  testApiConnection() {
    console.log('Iniciando prueba de conexión con la API...');

    this.apiService.obtenerUsuarios().subscribe({
      next: (res) => {
        // La respuesta es { mensaje: "...", data: [...] }
        console.log('--- CONEXIÓN EXITOSA ---');
        console.log('Mensaje de la API:', res.mensaje);
        console.log('DATOS DEL USUARIO (Tabla Usuarios):', res.data); // Muestra el array de usuarios
      },
      error: (err) => {
        console.error('--- ERROR EN LA CONEXIÓN ---');
        console.error('Asegúrate de que el servidor Node.js está corriendo en http://localhost:3000');
        console.error('Detalles del error:', err);
      },
      complete: () => {
        console.log('Suscripción a la API finalizada.');
      }
    });
  }


  // ❗ MANTENEMOS la función del alert por si la usas en el HTML (aunque no la necesites para la prueba)
  async presentAutoClosingAlert() {
    const alert = await this.alertController.create({
      header: 'Recuperación',
      message: 'Esta ventana se cerrará automáticamente en 3 segundos.',
      buttons: [], 
      backdropDismiss: false 
    });

    await alert.present();

    setTimeout(async () => {
      const dismissed = await alert.onDidDismiss();
      if (dismissed.role === 'backdrop' || dismissed.role === undefined) {
         await alert.dismiss();
      }
    }, 3000);
  }
}