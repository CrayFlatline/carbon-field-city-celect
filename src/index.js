/**
 * External dependencies.
 */
import { registerFieldType } from '@carbon-fields/core';

/**
 * Internal dependencies.
 */
import './style.scss';
import CitySelectField from './main';

registerFieldType( 'city_select', CitySelectField );
