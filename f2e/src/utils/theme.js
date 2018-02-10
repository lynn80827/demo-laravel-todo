/* eslint no-unused-expressions:0 */
// @flow

import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';

export default function injectGlobalStyle(): void {
  injectGlobal`
    ${normalize()}

    * {
      box-sizing: border-box;
    }

    body {
      background-color: #fafafa;
    }
  `;
}
