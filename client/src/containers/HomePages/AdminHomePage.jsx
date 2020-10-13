import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../services/UserContext';
import { deleteSkill, getAllSkills } from '../../services/SkillsService';
import { deleteBenefit, getAllBenefits } from '../../services/BenefitsService';
import { deleteCategory, getAllCategories } from '../../services/CategoryService';
import { EditButton } from '../../components/Buttons/EditButton';
import { DeleteButton } from '../../components/Buttons/DeleteButton';
import { AddButton } from '../../components/Buttons/AddButton';
import { getAllAdmins } from '../../services/AdminService';
import { Spinner } from '../../components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import { routes } from '../../utils/Constants';
import { Dialog } from '../../components/Dialog/Dialog';

export const AdminHomePage = () => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        getSkills();
        getBenefits();
        getCategories();
        getAdmins();
    }, []);

    const getSkills = () => {
        getAllSkills().then(response => {
            setSkills(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
    };

    const getBenefits = () => {
        getAllBenefits().then(response => {
            setBenefits(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
    };

    const getCategories = () => {
        getAllCategories().then(response => {
            setCategories(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
    };

    const getAdmins = () => {
        getAllAdmins(user.token).then(response => {
            setAdmins(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
    }

    return(
        <> { isLoading ? <Spinner /> :
            <div className="admin-homepage">
                <div className="admin-homepage__row">
                    <div className="admin-homepage__row__child">
                        <SkillSection skills={skills} getAllSkills={getSkills} />
                    </div>
                    <div className="admin-homepage__row__child">
                        <BenefitSection benefits={benefits} getAllBenefits={getBenefits} />
                    </div>
                </div>
                
                <div className="admin-homepage__row">
                    <div className="admin-homepage__row__child">
                        <CategoriesSection categories={categories} getAllCategories={getCategories} />
                    </div>
                    <div className="admin-homepage__row__child">
                         <div className="admin-homepage__section-title">
                            <h4>Admins</h4>
                            <AddButton />
                         </div>                        
                        <table className="admin-homepage__table-container">
                                <tr>
                                    <th>E-mail</th>
                                    <th>Username</th>
                                </tr>
                                {admins.map((admin, index) => 
                                <tr key={index}>
                                    <td>{admin.email}</td>
                                    <td>{admin.username}</td>
                                </tr>
                                )}
                        </table>
                    </div>
                </div>
            </div> }
        </>
    );
}

const SkillSection = ({ skills, getAllSkills}) => {
    const history = useHistory();
    const { user, authenticated } = useContext(UserContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState({showDialog: false, skill: null});

    const handleCloseDialog = () => {
        setShowDeleteDialog({showDialog: false, skill: null});
    };

    const handleOpenDialog = (skill) => {
        setShowDeleteDialog({showDialog: true, skill: skill});
    };

    const handleDelete = (skillId) => {
        if (user && authenticated) {
            deleteSkill(skillId, user.token).then(response => {
                getAllSkills();
                handleCloseDialog();
            }).catch(error => console.log(error));
        }
    }

    return (
        <>
        { showDeleteDialog && showDeleteDialog.showDialog ?
            <Dialog
             title="Delete skill confirmation"
             content={`Are you sure that you want to delete ${showDeleteDialog.skill.name}`}
             handleOnClose={() => handleCloseDialog()}
             handleOnConfirm={() => handleDelete(showDeleteDialog.skill.id)}
            /> : <></> }
            <div className="admin-homepage__section-title">
                <h4>Skills</h4>
                <AddButton handleClick={() => history.push(routes.SKILLS_NEW)}/>
            </div>                        
            <table className="admin-homepage__table-container">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    {skills.map((skill, index) => 
                    <tr key={index}>
                        <td>{skill.name}</td>
                        <td>
                            <EditButton handleClick={() => history.push(`/skills/edit/${skill.id}`)}/>
                            <DeleteButton handleClick={() => handleOpenDialog(skill)}/>
                        </td>
                    </tr>
                    )}
                </table>
        </>
    );
}

const BenefitSection = ({ benefits, getAllBenefits}) => {
    const history = useHistory();
    const { user, authenticated } = useContext(UserContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState({showDialog: false, benefit: null});

    const handleCloseDialog = () => {
        setShowDeleteDialog({showDialog: false, benefit: null});
    };

    const handleOpenDialog = (benefit) => {
        setShowDeleteDialog({showDialog: true, benefit: benefit});
    };

    const handleDelete = (benefitId) => {
        if (user && authenticated) {
            deleteBenefit(benefitId, user.token).then(response => {
                getAllBenefits();
                handleCloseDialog();
            }).catch(error => console.log(error));
        }
    }

    return (
        <>
        { showDeleteDialog && showDeleteDialog.showDialog ?
            <Dialog
             title="Delete benefit confirmation"
             content={`Are you sure that you want to delete ${showDeleteDialog.benefit.name}`}
             handleOnClose={() => handleCloseDialog()}
             handleOnConfirm={() => handleDelete(showDeleteDialog.benefit.id)}
            /> : <></> }
            <div className="admin-homepage__section-title">
                            <h4>Benefits</h4>
                            <AddButton handleClick={()=> history.push(routes.BENEFITS_NEW)}/>
                        </div>
                        <table className="admin-homepage__table-container">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            {benefits.map((benefit, index) => 
                            <tr key={index}>
                                <td>{benefit.name}</td>
                                <td>{benefit.description}</td>
                                <td>
                                    <EditButton handleClick={() => history.push(`/benefits/edit/${benefit.id}`)}/>
                                    <DeleteButton handleClick={() => handleOpenDialog(benefit)}/>
                                </td>
                            </tr>
                            )}
                    </table>
        </>
    );
}

const CategoriesSection = ({ categories, getAllCategories}) => {
    const history = useHistory();
    const { user, authenticated } = useContext(UserContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState({showDialog: false, category: null});

    const handleCloseDialog = () => {
        setShowDeleteDialog({showDialog: false, category: null});
    };

    const handleOpenDialog = (category) => {
        setShowDeleteDialog({showDialog: true, category: category});
    };

    const handleDelete = (categoryId) => {
        if (user && authenticated) {
            deleteCategory(categoryId, user.token).then(response => {
                getAllCategories();
                handleCloseDialog();
            }).catch(error => console.log(error));
        }
    }

    return (
        <>
        { showDeleteDialog && showDeleteDialog.showDialog ?
            <Dialog
             title="Delete category confirmation"
             content={`Are you sure that you want to delete ${showDeleteDialog.category.name}`}
             handleOnClose={() => handleCloseDialog()}
             handleOnConfirm={() => handleDelete(showDeleteDialog.category.id)}
            /> : <></> }
             <div className="admin-homepage__section-title">
                            <h4>Categories</h4>
                            <AddButton handleClick={() => history.push(routes.CATEGORIES_NEW)}/>
                    </div>                        
                    <table className="admin-homepage__table-container">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            {categories.map((category, index) => 
                            <tr key={index}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <EditButton handleClick={() => history.push(`/categories/edit/${category.id}`)}/>
                                    <DeleteButton handleClick={() => handleOpenDialog(category)}/>
                                </td>
                            </tr>
                            )}
                    </table>
        </>
    );
}
