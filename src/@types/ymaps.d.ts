declare module  'ymaps' {
    export function ready(): Promise;
    // export function load(): Promise;
    export function load(a: any): Promise;
    
  
    class Promise {
      then(onFulfilled?: Function, onRejected?: Function, onProgress?: Function, ctx?: any): Promise;
    }
    // class Panorama {
      
    // }
    class panorama {
      static createPlayer(arg0: string, arg1: number[], arg2: { layer: string; }) {
        throw new Error('Method not implemented.');
      }
      static isSupported() {
        throw new Error('Method not implemented.');
      }
      static locate: any;      
      static Player: any;      
    }
    class Player {
      
    }
  
    export class Map {
      constructor(element: string | any, state: MapState);
    }
  
    export class MapState {
      center: number[];
      controls: string[];
      zoom: number;
    }
  }