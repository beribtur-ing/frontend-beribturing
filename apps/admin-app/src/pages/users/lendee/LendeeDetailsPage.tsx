import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  Pagination,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';
import { useLendeeDetail, useRentalRecordRdosByLendeeId } from '~/hooks';

export default function LendeeDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useLendeeDetail(id);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('activity');
  const { rentalRecords, total, offset, limit, changeCurrentPage, changePageLimit, isLoading } = useRentalRecordRdosByLendeeId({
    lendeeId: id,
    limit: 5
  });

  const handleDelete = () => {
    // setShowDeleteDialog(false);
    // navigate(`/users`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: { sm: 'space-between' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate(`/users`)}>
            <ArrowLeft size={20}/>
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User details and management.
            </Typography>
          </Box>
        </Box>
        {/*<Box sx={{ display: 'flex', gap: 1 }}>*/}
        {/*  <Button variant="outlined" component={Link} to={`/users/${id}/edit`} startIcon={<Edit size={16}/>}>*/}
        {/*    Edit User*/}
        {/*  </Button>*/}
        {/*  <Button color="error" onClick={() => setShowDeleteDialog(true)} startIcon={<Trash2 size={16}/>}>*/}
        {/*    Delete User*/}
        {/*  </Button>*/}
        {/*</Box>*/}
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' } }}>
        <Card>
          <CardContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 3 }}>
              <Avatar sx={{ width: 96, height: 96, mb: 2 }}>
                {user?.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Avatar>
              <Typography variant="h5" fontWeight="600">
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {user?.profile?.email}
              </Typography>
              <Chip label={'lendee'} color={'secondary'} sx={{ mb: 1 }}/>
              <Chip label={user?.active ? 'Active' : 'Inactive'} color={user?.active ? 'success' : 'error'}/>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Phone:
                </Typography>
                <Typography variant="body2">{user?.phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Joined:
                </Typography>
                <Typography variant="body2">{new Date(user?.registeredOn || '').toLocaleDateString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Activity:
                </Typography>
                <Typography variant="body2">
                  {/*{user?.totalRentals && `${user?.totalRentals} rentals`}*/}
                  {/*{user?.totalListings && `${user?.totalListings} listings`}*/}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {user?.active ? (
                <Button variant="outlined" fullWidth startIcon={<Ban size={16}/>}>
                  Deactivate Account
                </Button>
              ) : (
                <Button variant="outlined" fullWidth startIcon={<CheckCircle size={16}/>}>
                  Activate Account
                </Button>
              )}
              <Button variant="outlined" fullWidth>
                Reset Password
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TabContext value={activeTab}>
            <TabList onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Activity" value="activity"/>
              <Tab label="Rentals" value="rentals"/>
              <Tab label="Reports" value="reports"/>
            </TabList>

            <TabPanel value="activity">
              <Card>
                <CardHeader title="Recent Activity" subheader="User's recent actions on the platform."/>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          Booked a rental
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Professional Camera Kit
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        2 days ago
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          Updated profile
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Changed phone number
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        1 week ago
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          Completed rental
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Power Drill Set
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        2 weeks ago
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value="rentals">
              <Card>
                <CardHeader title="Rental History" subheader="Items rented by this user."/>
                <CardContent>
                  {isLoading ? (
                    <Typography variant="body2" color="text.secondary">
                      Loading...
                    </Typography>
                  ) : rentalRecords.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No rental history found for this user.
                    </Typography>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {rentalRecords.map((record, index) => (
                          <Box key={record.id || index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {record.productRentalRecordRdo?.product?.title || 'Unknown Product'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {record?.period?.startDateTime ? new Date(record?.period?.startDateTime).toLocaleDateString() : 'N/A'} - {record?.period?.endDateTime ? new Date(record?.period?.endDateTime).toLocaleDateString() : 'Ongoing'}
                              </Typography>
                              {record.fee && (
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                  Fee: {record.fee.amount} {record.fee.unit}
                                </Typography>
                              )}
                            </Box>
                            <Chip 
                              label={record.status || 'Unknown'} 
                              color={record.status === 'ACTIVE' ? 'success' : record.status === 'COMPLETED' ? 'default' : 'warning'} 
                              size="small"
                            />
                          </Box>
                        ))}
                      </Box>
                      {total > limit && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                          <Pagination
                            count={Math.ceil(total / limit)}
                            page={Math.floor(offset / limit) + 1}
                            onChange={(_, page) => changeCurrentPage((page - 1) * limit)}
                            color="primary"
                            size="medium"
                          />
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value="reports">
              <Card>
                <CardHeader title="Reports" subheader="Reports involving this user."/>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    No reports found for this user.
                  </Typography>
                </CardContent>
              </Card>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>

      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete the user account and all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
