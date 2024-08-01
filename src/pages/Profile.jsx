// src/pages/Profile.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import uploadProfilePicture from '../utils/uploadProfilePicture';
import axios from 'axios';

const BASE_URL = 'https://26dcb711-8128-4562-903e-5e90ce17012c-00-2oc5jhzdfapax.pike.replit.dev';

const Profile = () => {
    const { user, profileData, setProfileData } = useAuth();
    const [profileImage, setProfileImage] = useState(profileData ? profileData.profile_image_url : null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploading(true);
            try {
                const fileUrl = await uploadProfilePicture(e.target.files[0], user.uid);

                // Update profile picture URL in the database
                const response = await axios.put(`${BASE_URL}/students/${user.uid}`, {
                    profile_image_url: fileUrl
                });

                setProfileImage(fileUrl);
                setProfileData(response.data);
                setUploading(false);
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                setUploading(false);
            }
        }
    };

    const handleRemoveImage = async () => {
        setUploading(true);
        try {
            // Remove profile picture URL in the database
            const response = await axios.delete(`${BASE_URL}/students/${user.uid}/profile_picture`);

            setProfileImage(null);
            setProfileData(response.data);
            setUploading(false);
        } catch (error) {
            console.error('Error removing profile picture:', error);
            setUploading(false);
        }
    };

    return (

        <Row className="justify-content-md-center mt-4">
            <Col md="6">
                <h2>Profile</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                        {profileImage && (
                            <div>
                                <img src={profileImage} alt="Profile" style={{ width: '100%', marginTop: '10px' }} />
                                <Button variant="danger" onClick={handleRemoveImage} className="mt-2">
                                    Remove Image
                                </Button>
                            </div>
                        )}
                    </Form.Group>
                    {uploading && <p>Uploading...</p>}
                    <Button variant="secondary" onClick={() => navigate('/todo')}>Back to Todo</Button>
                </Form>
            </Col>
        </Row>

    );
};

export default Profile;
