<?php
use Carbon_Fields\Carbon_Fields;
use Carbon_Field_City_Select\City_Select_Field;

define( 'Carbon_Field_City_Select\\DIR', __DIR__ );

Carbon_Fields::extend( City_Select_Field::class, function( $container ) {
	return new City_Select_Field( $container['arguments']['type'], $container['arguments']['name'], $container['arguments']['label'] );
} );