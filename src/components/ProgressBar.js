import Button from './Button';
import classes from '../styles/ProgressBar.module.css'
import React from 'react';

export default function ProgressBar(){
	return(
		<div className={classes.progressBar}>
			<div className={classes.backButton}>
				<span className="material-icons-outlined"> arrow_back </span>
			</div>
			<div className={classes.rangeArea}>
				<div className={classes.tooltip}>24% Cimplete!</div>
				<div className={classes.rangeBody}>
					<div className={classes.progress} style={{width: '20%'}}/>
				</div>
			</div>
			<a href="result.html">
				<Button clssName={classes.next}>
					<span>Next Question</span>
					<span className="material-icons-outlined">
						arrow_forward
					</span>
				</Button>
			</a>
		</div>
	);
}