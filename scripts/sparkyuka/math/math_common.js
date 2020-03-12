/**
 * @author {@link https://github.com/Glidias}
 */
const R = require('Reactive');

export const ZERO = R.val(0);
export const MINUS_ONE = R.val(-1);
export const ONE = R.val(1);

export const ZERO_VECTOR = R.vector(ZERO, ZERO, ZERO);
export const ZERO_POINT = R.point(ZERO, ZERO, ZERO);


/**
 * @param {ScalarSignal|BoolSignal|StringSignal} a
 */
export function copyValue(a) {
	return R.val(a.pinLastValue());
}

/**
 * @param {VectorSignal} a
 */
export function copyVector(a) {
	return R.vector(a.x.pinLastValue(), a.y.pinLastValue(), a.z.pinLastValue());
}

/**
 * @param {PointSignal} a
 */
export function copyPoint(a) {
	return R.point(a.x.pinLastValue(), a.y.pinLastValue(), a.z.pinLastValue());
}


/**
 * @param {VectorSignal|PointSignal} a
 * @param {VectorSignal|PointSignal} b
 */
export function vectorEquals(a, b) {
	return a.x.eq(b.x).and(a.y.eq(a.y), a.z.eq(b.z));
}


export function newPoint(x=0, y=0, z=0) {
	return R.point(R.val(x), R.val(y), R.val(z));
}
export function newVector(x=0, y=0, z=0) {
	return R.vector(R.val(x), R.val(y), R.val(z));
}