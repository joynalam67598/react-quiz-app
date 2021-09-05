import Checkbox from './Checkbox';
import classes from '../styles/Answers.module.css'
import React from 'react';

export default function Answers(){
	return(
		<div className={classes.answers}>
			<Checkbox className={classes.answer} text="A text ans"/>
		</div>
	);
}