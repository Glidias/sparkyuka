
import {ZERO, MINUS_ONE, ONE, copyValue, copyPoint, vectorEquals} from "./math_common"
const R = require('Reactive');
const DEFAULT_NORMAL = R.vector(ZERO, ZERO, ONE);

/**
* Class representing a plane in 3D space. The plane is specified in Hessian normal form.
*
* @author {@link https://github.com/Mugen87|Mugen87}
* @author {@link https://github.com/Glidias} Spark AR Reactive translations
*/
class Plane {

	/**
	* Constructs a new plane with the given values.
	*
	* @param {VectorSignal} normal - The normal vector of the plane.
	* @param {ScalarSignal} constant - The distance of the plane from the origin.
	*/
	constructor( normal = DEFAULT_NORMAL, constant = ZERO ) {

		/**
		* The normal vector of the plane.
		* @type PointSignal
		*/
		this.normal = normal;

		/**
		* The distance of the plane from the origin.
		* @type ScalarSignal
		*/
		this.constant = constant;

	}

	/**
	* Sets the given values to this plane.
	*
	* @param {VectorSignal} normal - The normal vector of the plane.
	* @param {ScalarSignal} constant - The distance of the plane from the origin.
	* @return {Plane} A reference to this plane.
	*/
	set( normal, constant ) {

		this.normal = normal;
		this.constant = constant;

		return this;

	}

	/**
	* Copies all values from the given plane to this plane.
	*
	* @param {Plane} plane - The plane to copy.
	* @return {Plane} A reference to this plane.
	*/
	copy( plane ) {

		this.normal = copyPoint( plane.normal );
		this.constant = copyValue(plane.constant);
		return this;

	}

	/**
	* Creates a new plane and copies all values from this plane.
	*
	* @return {Plane} A new plane.
	*/
	clone() {

		return new Plane().copy( this );

	}

	/**
	* Computes the signed distance from the given 3D vector to this plane.
	* The sign of the distance indicates the half-space in which the points lies.
	* Zero means the point lies on the plane.
	*
	* @param {PointSignal} point - A point in 3D space.
	* @return {ScalarSignal} The signed distance.
	*/
	distanceToPoint( point ) {

		return R.add(R.dot(this.normal, point), this.constant);

	}

	/**
	* Sets the values of the plane from the given normal vector and a coplanar point.
	*
	* @param {PointSignal} normal - A normalized vector.
	* @param {PointSignal} point - A coplanar point.
	* @return {Plane} A reference to this plane.
	*/
	fromNormalAndCoplanarPoint( normal, point ) {

		this.normal = normal;
		this.constant = R.mul(R.dot(this.normal, point), MINUS_ONE);
		return this;
	}

	/**
	* Sets the values of the plane from three given coplanar points.
	*
	* @param {PointSignal} a - A coplanar point.
	* @param {PointSignal} b - A coplanar point.
	* @param {PointSignal} c - A coplanar point.
	* @return {Plane} A reference to this plane.
	*/
	fromCoplanarPoints( a, b, c ) {

		let v1 = R.normalize(R.cross(R.sub(c, b), R.sub(a,b)));
		this.fromNormalAndCoplanarPoint( v1, a );
		return this;

	}

	/**
	* Performs a plane/plane intersection test and stores the intersection point
	* to the given 3D vector. If no intersection is detected, *null* is returned.
	*
	* Reference: Intersection of Two Planes in Real-Time Collision Detection
	* by Christer Ericson (chapter 5.4.4)
	*
	* @param {Plane} plane - The plane to test.
	* @return {PointSignal} The result position.
	*/
	intersectPlane( plane ) {

		// compute direction of intersection line
		const d = R.cross(this.normal, plane.normal);


		// if d is zero, the planes are parallel (and separated)
		// or coincident, so they’re not considered intersecting

		const denom = R.dot(d, d);

		if ( denom.eq(R.val(0)) ) return null;

		// compute point on intersection line


		const v1 = R.mul(plane.normal, this.constant);
		const v2 = R.mul(this.normal, plane.constant);


		return R.cross(v1.sub(v1, v2), d).div(denom);

	}

	/**
	* Returns true if the given plane intersects this plane.
	*
	* @param {Plane} plane - The plane to test.
	* @return {BoolSignal} The result of the intersection test.
	*/
	intersectsPlane( plane ) {

		const d = R.dot(this.normal, plane.normal); //this.normal.dot( plane.normal );
		return R.ne(R.abs(d), ONE);

	}

	/**
	* Projects the given point onto the plane. The result is written
	* to the given vector.
	*
	* @param {PointSignal} point - The point to project onto the plane.
	* @return {PointSignal} The projected point.
	*/
	projectPoint( point ) {

		const v1 = R.mul(this.normal, this.distanceToPoint(point));
		return R.sub(point, v1);

	}

	/**
	* Returns true if the given plane is deep equal with this plane.
	*
	* @param {Plane} plane - The plane to test.
	* @return {BoolSignal} The result of the equality test.
	*/
	equals( plane ) {
		return R.and(vectorEquals(plane.normal, this.normal), plane.constant.eq(this.constant));
	}

}

export { Plane };