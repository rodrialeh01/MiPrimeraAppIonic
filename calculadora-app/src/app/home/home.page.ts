import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CalculadoraService, OperacionResponse } from '../services/calculadora.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
  standalone: false,
})
export class HomePage {

  num1: number | null = null;
  num2: number | null = null;
  ultimaOperacion: string | null = null;
  ultimoResultado: number | null = null;
  cargando = false;

  constructor(
    private calculadoraService: CalculadoraService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async sumar() {
    if(!this.validarNumeros()) return;

    const loading = await this.mostrarLoading('Sumando...');

    this.calculadoraService.sumar(this.num1!, this.num2!).subscribe({
      next: async (response: OperacionResponse) => {
        this.procesarResultado(response);
        loading.dismiss();
      },
      error: async (error) => {
        await loading.dismiss();
        this.mostrarError('Error','Error al realizar la suma: ' + error.message);
      }
    });
  }

  async restar() {
    if(!this.validarNumeros()) return;

    const loading = await this.mostrarLoading('Sumando...');

    this.calculadoraService.restar(this.num1!, this.num2!).subscribe({
      next: async (response: OperacionResponse) => {
        this.procesarResultado(response);
        loading.dismiss();
      },
      error: async (error) => {
        await loading.dismiss();
        this.mostrarError('Error','Error al realizar la resta: ' + error.message);
      }
    });
  }

  limpiarFormulario() {
    this.num1 = null;
    this.num2 = null;
    this.ultimoResultado = null;
    this.ultimaOperacion = null;
  }

  private validarNumeros(): boolean {
    if (this.num1 === null || this.num2 === null) {
      this.mostrarToast('Por favor, ingrese ambos números.', 'warning');
      return false;
    }
    return true;
  }

  private procesarResultado(response: OperacionResponse) {
    this.ultimoResultado = response.resultado;
    this.ultimaOperacion = `Resultado: ${this.ultimoResultado}`;
    this.mostrarToast('Operación realizada con éxito.', 'success');
  }

  async refrescar(event: any){
    event.target.complete()
  }

  private async mostrarLoading(mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje,
      spinner: 'circles'
    });
    await loading.present();
    return loading;
  }

  private async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  private async mostrarError(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
