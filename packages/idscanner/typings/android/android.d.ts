declare module com {
  export module tzkit {
    export module ui {
      export class MLTextBase {
        public static class: java.lang.Class<com.tzkit.ui.MLTextBase>;
        public constructor(param0: string, param1: androidNative.Array<globalAndroid.graphics.Point>, param2: globalAndroid.graphics.Rect);
        public getText(): string;
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class MLTextBloc {
        public static class: java.lang.Class<com.tzkit.ui.MLTextBloc>;
        public constructor(param0: com.tzkit.ui.MLTextBase, param1: java.util.ArrayList<com.tzkit.ui.MLTextLine>);
        public getBloc(): com.tzkit.ui.MLTextBase;
        public getLines(): java.util.ArrayList<com.tzkit.ui.MLTextLine>;
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class MLTextElement {
        public static class: java.lang.Class<com.tzkit.ui.MLTextElement>;
        public getElem(): com.tzkit.ui.MLTextBase;
        public constructor(param0: com.tzkit.ui.MLTextBase);
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class MLTextLine {
        public static class: java.lang.Class<com.tzkit.ui.MLTextLine>;
        public constructor(param0: com.tzkit.ui.MLTextBase, param1: java.util.ArrayList<com.tzkit.ui.MLTextElement>);
        public getLine(): com.tzkit.ui.MLTextBase;
        public getElements(): java.util.ArrayList<com.tzkit.ui.MLTextElement>;
      }
    }
  }
}

declare module com {
  export module tzkit {
    export module ui {
      export class NSDocCallback {
        public static class: java.lang.Class<com.tzkit.ui.NSDocCallback>;
        /**
         * Constructs a new instance of the com.tzkit.ui.NSDocCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onImageSelected(param0: globalAndroid.graphics.Bitmap): void; onSuccess(param0: androidNative.Array<com.tzkit.ui.MLTextBloc>): void; onError(param0: string): void; userCancelled(): void });
        public constructor();
        public onSuccess(param0: androidNative.Array<com.tzkit.ui.MLTextBloc>): void;
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
        documentScanner: com.tzkit.ui.NSDocScan;
        public onCreate(param0: globalAndroid.os.Bundle): void;
        public constructor();
        public getDocumentScanner(): com.tzkit.ui.NSDocScan;
      }
      export module NSDocScanActivity {
        export class Companion {
          static show() {
            throw new Error('Method not implemented.');
          }
          public static class: java.lang.Class<com.tzkit.ui.NSDocScanActivity.Companion>;
          public show(param0: androidx.activity.ComponentActivity): void;
        }
      }
    }
  }
}

//Generics information:
