import { Collapse, Select } from "antd";
import { Input, TextArea, InputSelect } from "@/diginext/form/Form";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { useRef } from "react";
import { getFileNameFromPath } from "@/helpers/helpers";
import ContentImage from "@/diginext/upload/contentImage";
const { Panel } = Collapse;
const { Option } = Select;

const SectionRecruitment1 = (props) => {
	const formInputRef = useRef({});

	const updateSection = function (isDelete = false) {
		props.updateSection(props.locale, formInputRef.current.section.value.value, props.index, isDelete);
	};

	return (
		<Collapse defaultActiveKey={[`postContent_${props.locale}${props.indexRef}`]}>
			<Panel header="Section 1" key={`postContent_${props.locale}${props.indexRef}`}>
				<ListItem style={{ marginRight: "1rem" }}>
					<InputSelect ref={(el) => (formInputRef.current.section = el)} labelInValue defaultValue={{ value: 1 }}>
						{props.sectionOptions.map(function (name, index) {
							return (
								<Select.Option key={`SectionBox_${props.locale}${index}`} value={index + 1}>
									{name}
								</Select.Option>
							);
						})}
					</InputSelect>
				</ListItem>
				<AdminButton size={ButtonSize.SMALL} style={{ margin: "5px" }} onClick={(e) => updateSection(false)}>
					Insert
				</AdminButton>
				<AdminButton size={ButtonSize.SMALL} style={{ margin: "5px" }} type={ButtonType.DANGER} onClick={(e) => updateSection(true)}>
					Remove
				</AdminButton>
				<Input
					ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][section]`] = el)}
					defaultValue={1}
					style={{ display: "none" }}
				/>
				<HorizontalList itemSize="auto">
					<ContentImage
						name={getFileNameFromPath(props.content.banner) || `banner_${props.locale}${props.indexRef}`}
						imageUrl={
							props.contentImgs[
								`${props.content.banner ? getFileNameFromPath(props.content.banner) : `banner_${props.locale}${props.indexRef}`}Url`
							] || props.content.banner
						}
						imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.banner)}`]}
						handleChange={props.handleChangeSingleUploadContent}
					/>
					<Input
						ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][banner]`] = el)}
						defaultValue={getFileNameFromPath(props.content.banner) || `banner_${props.locale}${props.indexRef}`}
						style={{ display: "none" }}
					/>
				</HorizontalList>
			</Panel>
		</Collapse>
	);
};

export default SectionRecruitment1;
