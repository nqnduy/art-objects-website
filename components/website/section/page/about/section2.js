import { Collapse, Select, Divider } from "antd";
import { Input, TextArea, InputSelect } from "@/diginext/form/Form";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { useRef } from "react";
import { getFileNameFromPath } from "@/helpers/helpers";
import ContentImage from "@/diginext/upload/contentImage";
import Editor from "@/diginext/editor/editor";
const { Panel } = Collapse;
const { Option } = Select;

const SectionAbout2 = (props) => {
	const formInputRef = useRef({});

	const updateSection = function (isDelete = false) {
		props.updateSection(props.locale, formInputRef.current.section.value.value, props.index, isDelete);
	};

	return (
		<Collapse defaultActiveKey={[`postContent_${props.locale}${props.indexRef}`]}>
			<Panel header="Section 2" key={`postContent_${props.locale}${props.indexRef}`}>
				<ListItem style={{ marginRight: "1rem" }}>
					<InputSelect ref={(el) => (formInputRef.current.section = el)} labelInValue defaultValue={{ value: 2 }}>
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
					defaultValue={2}
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

				<HorizontalList itemSize="stretch">
					<Editor
						refRoot={props.formInputRef}
						refName={`content_${props.locale}[${props.indexRef}][content]`}
						content={props.content.content}
						user={props.user}
					/>
				</HorizontalList>

				<Divider orientation="left"></Divider>
				<HorizontalList itemSize="auto" style={{ marginTop: "10px" }}>
					<ListItem style={{ marginRight: "1rem" }}>
						<ContentImage
							name={getFileNameFromPath(props.content.noteimage1) || `noteimage1_${props.locale}${props.indexRef}`}
							imageUrl={
								props.contentImgs[
									`${
										props.content.noteimage1
											? getFileNameFromPath(props.content.noteimage1)
											: `noteimage1_${props.locale}${props.indexRef}`
									}Url`
								] || props.content.noteimage1
							}
							imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.noteimage1)}`]}
							handleChange={props.handleChangeSingleUploadContent}
						/>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteimage1]`] = el)}
							defaultValue={getFileNameFromPath(props.content.noteimage1) || `noteimage1_${props.locale}${props.indexRef}`}
							style={{ display: "none" }}
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteTitle1]`] = el)}
							defaultValue={props.content.noteTitle1}
							placeholder="B??c s?? c?? tr??nh ?????"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteDesc1]`] = el)}
							defaultValue={props.content.noteDesc1}
							placeholder="25 n??m kinh nghi???m"
						/>
					</ListItem>
					<ListItem style={{ marginRight: "1rem" }}>
						<ContentImage
							name={getFileNameFromPath(props.content.noteimage2) || `noteimage2_${props.locale}${props.indexRef}`}
							imageUrl={
								props.contentImgs[
									`${
										props.content.noteimage2
											? getFileNameFromPath(props.content.noteimage2)
											: `noteimage2_${props.locale}${props.indexRef}`
									}Url`
								] || props.content.noteimage2
							}
							imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.noteimage2)}`]}
							handleChange={props.handleChangeSingleUploadContent}
						/>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteimage2]`] = el)}
							defaultValue={getFileNameFromPath(props.content.noteimage2) || `noteimage2_${props.locale}${props.indexRef}`}
							style={{ display: "none" }}
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteTitle2]`] = el)}
							defaultValue={props.content.noteTitle2}
							placeholder="Thi???t b??? hi???n ?????i"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteDesc2]`] = el)}
							defaultValue={props.content.noteDesc2}
							placeholder="Nh??n hi???u v?? th???i gian th??? nghi???m"
						/>
					</ListItem>
				</HorizontalList>

				<HorizontalList itemSize="auto" style={{ marginTop: "10px" }}>
					<ListItem style={{ marginRight: "1rem" }}>
						<ContentImage
							name={getFileNameFromPath(props.content.noteimage3) || `noteimage3_${props.locale}${props.indexRef}`}
							imageUrl={
								props.contentImgs[
									`${
										props.content.noteimage3
											? getFileNameFromPath(props.content.noteimage3)
											: `noteimage3_${props.locale}${props.indexRef}`
									}Url`
								] || props.content.noteimage3
							}
							imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.noteimage3)}`]}
							handleChange={props.handleChangeSingleUploadContent}
						/>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteimage3]`] = el)}
							defaultValue={getFileNameFromPath(props.content.noteimage3) || `noteimage3_${props.locale}${props.indexRef}`}
							style={{ display: "none" }}
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteTitle3]`] = el)}
							defaultValue={props.content.noteTitle3}
							placeholder="Tr??? gi??p kh???n c???p"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteDesc3]`] = el)}
							defaultValue={props.content.noteDesc3}
							placeholder="Nh???n tr??? gi??p b???t c??? l??c n??o trong ng??y"
						/>
					</ListItem>
					<ListItem style={{ marginRight: "1rem" }}>
						<ContentImage
							name={getFileNameFromPath(props.content.noteimage4) || `noteimage4_${props.locale}${props.indexRef}`}
							imageUrl={
								props.contentImgs[
									`${
										props.content.noteimage4
											? getFileNameFromPath(props.content.noteimage4)
											: `noteimage4_${props.locale}${props.indexRef}`
									}Url`
								] || props.content.noteimage4
							}
							imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.noteimage4)}`]}
							handleChange={props.handleChangeSingleUploadContent}
						/>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteimage4]`] = el)}
							defaultValue={getFileNameFromPath(props.content.noteimage4) || `noteimage4_${props.locale}${props.indexRef}`}
							style={{ display: "none" }}
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteTitle4]`] = el)}
							defaultValue={props.content.noteTitle4}
							placeholder="Ph????ng ph??p ti???p c???n c?? nh??n"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][noteDesc4]`] = el)}
							defaultValue={props.content.noteDesc4}
							placeholder="M???i tr?????ng h???p lu??n ?????c bi???t"
						/>
					</ListItem>
				</HorizontalList>
				<Divider orientation="left"></Divider>

				<HorizontalList itemSize="auto" style={{ marginTop: "10px" }}>
					<ListItem style={{ marginRight: "1rem" }}>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoTitle1]`] = el)}
							defaultValue={props.content.infoTitle1}
							placeholder="Th??nh l???p n??m"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoDesc1]`] = el)}
							defaultValue={props.content.infoDesc1}
							placeholder="2006"
						/>
					</ListItem>
					<ListItem style={{ marginRight: "1rem" }}>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoTitle2]`] = el)}
							defaultValue={props.content.infoTitle2}
							placeholder="B??c s??"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoDesc2]`] = el)}
							defaultValue={props.content.infoDesc2}
							placeholder="147"
						/>
					</ListItem>
					<ListItem style={{ marginRight: "1rem" }}>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoTitle3]`] = el)}
							defaultValue={props.content.infoTitle3}
							placeholder="Ngo???i tr??"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoDesc3]`] = el)}
							defaultValue={props.content.infoDesc3}
							placeholder="8270"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoUnit3]`] = el)}
							defaultValue={props.content.infoUnit3}
							placeholder="ngh??n"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoTail3]`] = el)}
							defaultValue={props.content.infoTail3}
							placeholder="L?????t/n??m"
						/>
					</ListItem>
					<ListItem style={{ marginRight: "1rem" }}>
						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoTitle4]`] = el)}
							defaultValue={props.content.infoTitle4}
							placeholder="N???i tr??"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoDesc4]`] = el)}
							defaultValue={props.content.infoDesc4}
							placeholder="8851"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoUnit4]`] = el)}
							defaultValue={props.content.infoUnit4}
							placeholder="ngh??n"
						/>

						<Input
							ref={(el) => (props.formInputRef.current[`content_${props.locale}[${props.indexRef}][infoTail4]`] = el)}
							defaultValue={props.content.infoTail4}
							placeholder="L?????t/n??m"
						/>
					</ListItem>
				</HorizontalList>
			</Panel>
		</Collapse>
	);
};

export default SectionAbout2;
