import { DataProvider } from 'src/providers/data';
import { TaoWalletProvider } from 'src/providers/tao-wallet';
import { UntypedFormBuilder } from '@angular/forms';

export const providers = [
  DataProvider,
  TaoWalletProvider,
  UntypedFormBuilder
];
