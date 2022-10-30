/* Given matrix board[][] of dimensions m1 x m2 and pattern
 * pattern[][] of dimensions n1 x n2, the task is to check whether a pattern
 * exists in the matrix or not, and if yes then print the top most indices
 * of the pattern[][] in board[][]. It is assumed that m1, m2 ≥ n1, n2
 * 
 * If any of the elements of pattern are letters, then every element of the submatrix
 * that corresponds to that letter, must be the same. Also, every other letter must correspond
 * to a different value. 
 * 
 * If the element in pattern, is a number,
 * then the element of the submatrix must match the number exactly */

/* Example 1
 * board:
 *     0 1 2 3 4
 *   [
 * 0   1 5 8 2 9
 * 1   1 2 4 8 2
 * 2   4 4 7 6 3
 *   ]
 * 
 * pattern:
 * [
 *   a 2
 *   4 b
 * ]
 * 
 * output:
 * [ 1, 0 ]
 * 
 * */