import React from 'react';

//Material UI 
import { Card, CardContent, Typography } from '@material-ui/core';

function Cards({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" className="card__title">
                    {title}
                </Typography>
                <h2 className="card__cases"> {cases} </h2>
                <Typography color="textSecondary" className="card__total">
                    Total {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Cards
