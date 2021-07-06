import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core';
import 'normalize.css';
import cn from 'classnames';


const useStyles = makeStyles(theme => ({
	container: {
		margin: '12px 0',
		padding: 12,
		border: 'none',
	},
	activeContainer: {
		border: '1px solid #7ebb6a',
	}
}))

export const ListItem = React.memo(({
	content, 
	index,
	activeScrollIndex = 0, 
	setSelected,
}:{
	content: string;
	index: number;
	activeScrollIndex?: number;
	setSelected: (i: number) => any;
}) => {
	const classes = useStyles();

	return <div onMouseEnter={() => setSelected(index)} onMouseDown={() => setSelected(index)} className={cn(classes.container, { [classes.activeContainer]: activeScrollIndex == index })}><pre style={{whiteSpace: 'pre-wrap'}}>{content}</pre></div>
})