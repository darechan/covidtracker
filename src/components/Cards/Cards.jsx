import React from 'react';
import CountUp from 'react-countup';
import './Cards.module.css';

//Material UI 
import { Card, CardContent, Typography } from '@material-ui/core';

function Cards({ title, cases, total }) {
    return (
        <Card className="card">
            <CardContent>
                <Typography color="textSecondary" className="card__title">
                    {title}
                </Typography>
                <Typography variant="h2">
                    {cases}
                <CountUp
                        start={0}
                        end={cases}
                        duration={2.5}
                />
                </Typography>
                <Typography color="textSecondary" className="card__total">
                    Total {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Cards
