export const fetchVisitCount = (setVisitCount) =>
{
    fetch('/api/visit-count')
        .then(response => response.json())
        .then(data => setVisitCount(data.visit_count))
        .catch(error => console.error('Error fetching visit count:', error));
};

export const handleSkillsChange = (selectedOptions, formData, setFormData) =>
{
    setFormData({
        ...formData,
        skills: selectedOptions || [],
    });
};

export const handleInputChange = (e, formData, setFormData, files, index) =>
{
    const { name, value } = e.target;

    if (name === 'descriptions')
    {
        const newDescriptions = [...formData.descriptions];
        newDescriptions[index] = value;
        setFormData({
            ...formData,
            descriptions: newDescriptions
        });
    } else if (name === 'images')
    {
        setFormData({
            ...formData,
            images: Array.from(files)
        });
    } else
    {
        setFormData({
            ...formData,
            [name]: value
        });
    }
};

export const addDescriptionField = (formData, setFormData) =>
{
    if (formData.descriptions.length < 5)
    {
        setFormData({
            ...formData,
            descriptions: [...formData.descriptions, '']
        });
    }
};

export const removeDescriptionField = (index, formData, setFormData) =>
{
    if (formData.descriptions.length > 1)
    {
        const newDescriptions = formData.descriptions.filter((desc, i) => i !== index);
        setFormData({
            ...formData,
            descriptions: newDescriptions
        });
    }
};

export const handleFileChange = (e, formData, setFormData) =>
{
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
    }));
    setFormData(prevFormData => ({
        ...prevFormData,
        images: [...prevFormData.images, ...previews]
    }));
};

export const removeImage = (index, formData, setFormData) =>
{
    setFormData(prevFormData => ({
        ...prevFormData,
        images: prevFormData.images.filter((_, i) => i !== index)
    }));
};

export const handleSubmit = async (e, formData, setFormData, selectedForm) =>
{
    e.preventDefault();
    const filteredDescriptions = formData.descriptions.filter(desc => desc.trim() !== '');
    const data = new FormData();
    data.append('formType', selectedForm);
    data.append('company', formData.company);
    data.append('title', formData.title);
    data.append('skills', JSON.stringify(formData.skills.map(skill => skill.value)));
    data.append('date', formData.date);
    data.append('descriptions', JSON.stringify(filteredDescriptions));
    data.append('projectTitle', formData.projectTitle);
    data.append('link', formData.link);
    data.append('language', formData.language);
    data.append('school', formData.school);
    data.append('degree', formData.degree);

    formData.images.forEach((image, index) =>
    {
        data.append('images', image.file);
    });

    const token = localStorage.getItem('token');

    try
    {
        const response = await fetch('/api/submit-data', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        });

        const result = await response.json();
        console.log('Success:', result);
    } catch (error)
    {
        console.error('Error:', error);
    }
};