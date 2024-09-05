/**
 * The alignments naming logic is:
 * - first part is the position of the menu in relation to the button
 * - then it's the corner of the button towards which to align the menu to
 *
 *
 *                 |                                         |
 *                 |                                         |
 *                 |                                         |
 *                 |top-top-left                top-top-right|
 * ----------------|-----------------------------------------|------------------
 *    left-top-left|                                         |right-top-right
 *                 |                                         |
 *                 |                  Button                 |
 *                 |                                         |
 * left-bottom-left|                                         |right-bottom-right
 * ----------------|-----------------------------------------|------------------
 *                 |bottom-bottom-left    bottom-bottom-right|
 *                 |                                         |
 *                 |                                         |
 *                 |                                         |
 *
 *
 */
export const alignOptions = [
    'top-top-left',
    'top-top-right',
    'right-top-right',
    'right-bottom-right',
    'bottom-bottom-right',
    'bottom-bottom-left',
    'left-bottom-left',
    'left-top-left',
];
