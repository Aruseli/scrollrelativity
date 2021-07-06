import React, { useRef, useState } from 'react';
import { ListItem } from './list-item';
import _ from 'lodash';
import _listJson from '../../public/list.json';
// @ts-ignore
import useKeypress from 'react-use-keypress';
import { makeStyles } from '@material-ui/core';


const listJson: any = _listJson;

const useStyles = makeStyles(theme => ({
	containerItems: {
		width: '100%', 
		height: '100%', 
		overflow: 'scroll', 
		position: 'absolute', 
		top: 0, 
		left: 0,
		padding: 16,
	}, 
}))

export const List = () => {
	const classes = useStyles();
	const [selected, setSelected] = useState(0);
	const [lineWay, setLineWay] = useState(0);

	const scrollRef = useRef<any>();
	const manualScrolling = useRef<boolean>(false);

	const onScroll = (event: any) => {
		if (!!manualScrolling.current) return;
		console.log('onScroll');
		const scrollT = event.target.scrollTop;
		const scrollH = event.target.scrollHeight;
		const offsetH = event.target.offsetHeight;
		const usefulPart = scrollH - offsetH;
		const percentagesOfUsefulPart = scrollT * 100 / usefulPart;
		const percentagesOfScrollableZone = offsetH * percentagesOfUsefulPart / 100;
		const lineWayOn = percentagesOfScrollableZone + scrollT;
		const allItems = event.target.childNodes;
		const itemIndex = _.findIndex(allItems, (el: any) => el.offsetTop < lineWay && (el.offsetTop + el.offsetHeight) > lineWay);
		if (itemIndex > 0) setSelected(itemIndex);
		setLineWay(lineWayOn);
	};

	const scrollToSelected = () => {
		scrollRef.current.childNodes?.[selected]?.scrollIntoView({block: "center"}); // {block: "center", behavior: "smooth"}
	};
	const moveUp = () => {
		console.log('moveUp');
		manualScrolling.current = true;
		setSelected(selected <= 1 ? 1 : selected - 1);
		scrollToSelected();
		setTimeout(() => manualScrolling.current = false, 1000);
		console.log(selected);
	}
	const moveDown = () => {
		console.log('moveDown');
		manualScrolling.current = true;
		setSelected(selected > listJson.length - 1 ? listJson.length - 1 : selected + 1);
		scrollToSelected();
		setTimeout(() => manualScrolling.current = false, 1000);
	}
	const padeUp = () => {
		manualScrolling.current = true;
		setSelected(1);
		scrollToSelected();
		setTimeout(() => manualScrolling.current = false, 1000);
	}
	const padeDown = () => {
		manualScrolling.current = true;
		setSelected(listJson.length - 1);
		scrollToSelected();
		setTimeout(() => manualScrolling.current = false, 1000);
	}
	const keyPress = useKeypress(['ArrowUp', 'ArrowDown'], (event: any) => {
		event.preventDefault();
		if (event.key === 'ArrowUp') {
			moveUp();
		} else if (event.key === 'ArrowDown') {
			moveDown();
		} else if (event.key === 'Home' || event.key === 'PageUp') {
			padeUp();
		} else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
			padeDown();
		}
  });

	return (<div ref={scrollRef} onScroll={onScroll} onKeyPress={keyPress} className={classes.containerItems}>
			<div />
			{listJson.map((str: string, i: number) => <ListItem key={i} content={str} index={i+1} setSelected={setSelected} activeScrollIndex={selected} />)}
		</div>
	)
}