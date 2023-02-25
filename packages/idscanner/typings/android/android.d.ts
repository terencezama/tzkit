declare module com {
  export module tzkit {
    export module ui {
      export class NSDocCallback {
        public static class: java.lang.Class<com.tzkit.ui.NSDocCallback>;
        /**
         * Constructs a new instance of the com.tzkit.ui.NSDocCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onImageSelected(param0: globalAndroid.graphics.Bitmap): void; onSuccess(param0: string): void; onError(param0: string): void; userCancelled(): void });
        public constructor();
        public onSuccess(param0: string): void;
        public onError(param0: string): void;
        public onImageSelected(param0: globalAndroid.graphics.Bitmap): void;
        public userCancelled(): void;
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class NSDocScan {
        public static class: java.lang.Class<com.tzkit.ui.NSDocScan>;
        public getCompleted(): any;
        public setCompleted(param0: any): void;
        public setCallback(param0: com.tzkit.ui.NSDocCallback): void;
        public start(param0: androidx.activity.ComponentActivity): void;
        public getCallback(): com.tzkit.ui.NSDocCallback;
        public constructor();
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class NSDocScanActivity {
        public static class: java.lang.Class<com.tzkit.ui.NSDocScanActivity>;
        public onCreate(param0: globalAndroid.os.Bundle): void;
        public constructor();
        public getDocumentScanner(): com.tzkit.ui.NSDocScan;
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class NSDocScanManager {
        public static class: java.lang.Class<com.tzkit.ui.NSDocScanManager>;
        public static INSTANCE: com.tzkit.ui.NSDocScanManager;
        public setCallback(param0: com.tzkit.ui.NSDocCallback): void;
        public show(param0: androidx.activity.ComponentActivity): void;
        public getCallback(): com.tzkit.ui.NSDocCallback;
      }
    }
  }
}

//Generics information:
