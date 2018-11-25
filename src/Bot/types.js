/* @flow */

/* :: import type { Update, ResponseParameters } from './generated' */

export type Result<R> =
  | {
      ok: false,
      description: string,
      error_code: number,
      parameters?: ResponseParameters,
    }
  | {
      ok: true,
      result: R,
    }

/* ::
declare var upd: Update
const { update_id, ...keys } = upd
*/

export type UpdateType = $Keys<typeof keys>
