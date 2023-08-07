import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, List, ListItem, Box, Typography } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { searchFilter } from '../../redux/actions/fetch_action';
import { Contact, Home, Products } from '../../assets/constants/constant';
import { Istate, IuserState } from '../../interface/product_reducer_interface';
import "../../assets/css/title.css";
import offer from "../../assets/images/offer.jpg"

const SideBar = (props: { open: boolean, handleCloseDrawer: () => void, name: string }) => {

    const isLogIn = useSelector(
        (state: IuserState) => state.userDataReducer.isLogIn
    );
    const dispatch = useDispatch();
    const allProducts = useSelector((state: Istate) => state.productReducer.allProducts);
    return (
        <React.Fragment>
            <Drawer open={props.open} onClose={props.handleCloseDrawer} >
                <Box sx={{
                    width: '220px',
                    backgroundColor: '#FAF9F6',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'

                }}>

                    {!isLogIn ?
                        (<Box sx={{ backgroundColor: '#f7e4e4', display: 'flex', padding: '10px' }}>
                            <div style={{ padding: '10px' }}>
                                <img src={offer} height={'70px'} width={'70px'} alt='offer'></img>
                            </div>
                            <div >
                                <Typography fontSize={'12px'} fontWeight={'700'}>Flat ₹200 off + <br />Free Shipping  </Typography>
                                <Typography fontSize={'11px'} fontWeight={'500'} sx={{ color: 'gray' }}>On First Order</Typography>
                                <Button variant='text' href='/login' sx={{ padding: '10px', fontSize: '13px', color: ' #fd7171', textTransform: 'none' }}>Login/signUp</Button>
                            </div>
                        </Box>)
                        :
                        (<Box sx={{ backgroundColor: '#615966', padding: '10px' }}>
                            <div style={{ padding: '10px' }}>
                                <BadgeOutlinedIcon sx={{ color: 'white', fontSize: '50px' }} />
                            </div>
                            <div >
                                <Typography fontSize={'30px'} fontWeight={'600'} color={'white'}>{props.name}</Typography>
                            </div>
                        </Box>
                        )
                    }
                    <List>
                        <ListItem>
                            <Button href="/" className="nav-items" sx={{ width: '100%' }}>
                                {Home}
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                href="/products"
                                className="nav-items"
                                data-testid="product"
                                sx={{ width: '100%' }}
                                onClick={() => dispatch(searchFilter(allProducts, false))}
                            >
                                {Products}
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button href="/contact" data-testid="contact" className="nav-items" sx={{ width: '100%' }}>
                                {Contact}
                            </Button>
                        </ListItem>

                    </List>
                </Box>
            </Drawer>

        </React.Fragment>
    )
}

export default SideBar
